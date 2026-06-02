const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * AppSpace containers cannot compile this app in-place (the webpack build exceeds
 * the container memory limit and gets OOM-killed). So we commit the prebuilt
 * `build/` output and serve it statically here — no compile happens at boot.
 *
 * AppSpace routes external ingress to container port 80, so production binds 80.
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

const listenPort = 80;
const serveBin = path.join(projectRoot, "node_modules", ".bin", "serve");
const buildIndex = path.join(projectRoot, "build", "index.html");

if (!fs.existsSync(buildIndex)) {
  log("missing prebuilt build/ output", { buildIndex });
  console.error(
    "[appspace] No build/index.html found. Run `npm run build` locally and commit the build/ folder before deploying."
  );
  process.exit(1);
}

log("serving prebuilt build", { listenPort, serveBin });

const serve = spawn(
  serveBin,
  ["-s", "build", "-l", `tcp://0.0.0.0:${listenPort}`, "--no-clipboard"],
  {
    stdio: "inherit",
    env: { ...process.env, HOST: "0.0.0.0" },
    cwd: projectRoot,
  }
);

serve.on("error", (err) => {
  log("serve spawn error", { message: err.message, code: err.code });
  process.exit(1);
});

serve.on("exit", (code, signal) => {
  log("serve exited", { code, signal });
  process.exit(code ?? 1);
});
