const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * AppSpace containers cannot compile this app in-place (the webpack build exceeds
 * the container memory limit and gets OOM-killed). So we commit the prebuilt
 * `build/` output and serve it statically here — no compile happens at boot.
 *
 * Port handling: AppSpace injects APPSPACE_PORT (the port its readiness probe
 * checks) while external ingress dials container :80. We bind BOTH so the pod
 * stays healthy (probe port) and reachable (ingress port).
 */
const projectRoot = path.join(__dirname, "..");
const isProduction = process.env.NODE_ENV === "production";

function log(message, data) {
  console.error("[appspace]", JSON.stringify({ message, data, timestamp: Date.now() }));
}

if (!isProduction) {
  log("starting craco dev server", { NODE_ENV: process.env.NODE_ENV ?? null });
  const dev = spawn("npx", ["craco", "start"], {
    stdio: "inherit",
    env: { ...process.env, HOST: "0.0.0.0" },
    shell: true,
  });
  dev.on("exit", (code) => process.exit(code ?? 1));
  return;
}

const serveCli = path.join(projectRoot, "node_modules", "serve", "build", "main.js");
const buildIndex = path.join(projectRoot, "build", "index.html");

if (!fs.existsSync(buildIndex)) {
  log("missing prebuilt build/ output", { buildIndex });
  console.error(
    "[appspace] No build/index.html found. Run `npm run build` locally and commit the build/ folder before deploying."
  );
  process.exit(1);
}

const envPort = Number(process.env.APPSPACE_PORT ?? process.env.PORT ?? 3000) || 3000;
// Primary first (its failure exits the process so AppSpace restarts the pod);
// 80 is bound best-effort for external ingress.
const ports = [...new Set([envPort, 80])];

function startServe(port, { primary }) {
  log("serving prebuilt build", { port, primary, serveCli });
  const child = spawn(
    process.execPath,
    [serveCli, "-s", "build", "-l", `tcp://0.0.0.0:${port}`, "--no-clipboard"],
    {
      stdio: "inherit",
      env: { ...process.env, HOST: "0.0.0.0" },
      cwd: projectRoot,
    }
  );

  child.on("error", (err) => {
    log("serve spawn error", { port, primary, message: err.message, code: err.code });
    if (primary) process.exit(1);
  });

  child.on("exit", (code, signal) => {
    log("serve exited", { port, primary, code, signal });
    if (primary) process.exit(code ?? 1);
  });

  return child;
}

ports.forEach((port, index) => startServe(port, { primary: index === 0 }));
