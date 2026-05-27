const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");

function debugLog(message, data, hypothesisId = "H5-H8") {
  // #region agent log
  console.error(
    "[appspace-debug]",
    JSON.stringify({
      sessionId: "c8cbdf",
      hypothesisId,
      location: "scripts/appspace-start.cjs",
      message,
      data,
      timestamp: Date.now(),
    })
  );
  // #endregion
}

function resolveListenPort() {
  const raw = process.env.APPSPACE_PORT ?? process.env.PORT ?? "3000";
  const port = Number(raw);
  return Number.isFinite(port) ? port : 3000;
}

const isProduction = process.env.NODE_ENV === "production";
const listenPort = resolveListenPort();
const serveBin = path.join(__dirname, "..", "node_modules", ".bin", "serve");

if (!isProduction) {
  debugLog("starting craco dev server", { NODE_ENV: process.env.NODE_ENV }, "H5");
  const child = spawn("npx", ["craco", "start"], {
    stdio: "inherit",
    env: { ...process.env, HOST: "0.0.0.0" },
    shell: true,
  });
  child.on("exit", (code) => process.exit(code ?? 1));
  return;
}

const buildIndex = path.join(__dirname, "..", "build", "index.html");
const hasBuild = fs.existsSync(buildIndex);

debugLog(
  "production static serve",
  {
    NODE_ENV: process.env.NODE_ENV,
    APPSPACE_PORT: process.env.APPSPACE_PORT ?? null,
    listenPort,
    hasBuild,
  },
  "H6"
);

if (!hasBuild) {
  debugLog("running production build", {}, "H7");
  const build = spawnSync("npm", ["run", "build"], {
    stdio: "inherit",
    env: process.env,
    cwd: path.join(__dirname, ".."),
  });
  if (build.status !== 0) {
    debugLog("production build failed", { status: build.status }, "H7");
    process.exit(build.status ?? 1);
  }
  debugLog("production build finished", {}, "H7");
}

debugLog("spawning serve", { listenPort, serveBin }, "H8");

const serve = spawn(
  serveBin,
  ["-s", "build", "-l", String(listenPort), "--no-clipboard"],
  {
    stdio: "inherit",
    env: { ...process.env, HOST: "0.0.0.0" },
    cwd: path.join(__dirname, ".."),
  }
);

setTimeout(() => {
  const req = http.get(
    { host: "127.0.0.1", port: listenPort, path: "/", timeout: 5000 },
    (res) => {
      debugLog("listen probe success", { statusCode: res.statusCode, listenPort }, "H8");
      res.resume();
    }
  );
  req.on("error", (err) => {
    debugLog("listen probe failed", { error: err.message, listenPort }, "H8");
  });
}, 4000);

serve.on("exit", (code) => process.exit(code ?? 1));
