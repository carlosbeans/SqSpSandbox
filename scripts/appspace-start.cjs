const { spawn, spawnSync } = require("child_process");
const http = require("http");
const path = require("path");

function debugLog(message, data, hypothesisId = "H5-H8") {
  const payload = {
    sessionId: "056c63",
    hypothesisId,
    location: "scripts/appspace-start.cjs",
    message,
    data,
    timestamp: Date.now(),
    runId: process.env.DEBUG_RUN_ID ?? "pre-fix",
  };
  // #region agent log
  console.error("[appspace-debug]", JSON.stringify(payload));
  fetch("http://127.0.0.1:7586/ingest/52d2e7f1-8d19-45b3-8e45-84e69bbf4642", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "056c63",
    },
    body: JSON.stringify(payload),
  }).catch(() => {});
  // #endregion
}

function resolveListenPort() {
  // AppSpace ingress routes to container :80; APPSPACE_PORT is often 3000 (CRA default).
  if (process.env.NODE_ENV === "production") {
    return 80;
  }

  const raw = process.env.APPSPACE_PORT ?? process.env.PORT ?? "3000";
  const port = Number(raw);
  return Number.isFinite(port) ? port : 3000;
}

const isProduction = process.env.NODE_ENV === "production";
const listenPort = resolveListenPort();
const serveBin = path.join(__dirname, "..", "node_modules", ".bin", "serve");
const projectRoot = path.join(__dirname, "..");

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

debugLog(
  "production static serve",
  {
    NODE_ENV: process.env.NODE_ENV,
    APPSPACE_PORT: process.env.APPSPACE_PORT ?? null,
    PORT: process.env.PORT ?? null,
    listenPort,
    portResolution: "production-ingress-80",
  },
  "H1"
);

debugLog("running production build", {}, "H7");
const build = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  env: process.env,
  cwd: projectRoot,
});
if (build.status !== 0) {
  debugLog("production build failed", { status: build.status }, "H7");
  process.exit(build.status ?? 1);
}
debugLog("production build finished", {}, "H7");

debugLog("spawning serve", { listenPort, serveBin }, "H8");

const serve = spawn(
  serveBin,
  ["-s", "build", "-l", String(listenPort), "--no-clipboard"],
  {
    stdio: "inherit",
    env: { ...process.env, HOST: "0.0.0.0" },
    cwd: projectRoot,
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
