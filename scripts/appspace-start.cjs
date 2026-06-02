const { spawn } = require("child_process");

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

const isProduction = process.env.NODE_ENV === "production";

debugLog(
  "starting craco server",
  {
    NODE_ENV: process.env.NODE_ENV ?? null,
    APPSPACE_PORT: process.env.APPSPACE_PORT ?? null,
    PORT: process.env.PORT ?? null,
    HOST: process.env.HOST ?? null,
    isProduction,
    strategy: "craco-dev-server-no-startup-build",
  },
  isProduction ? "H9" : "H5"
);

const child = spawn("npx", ["craco", "start"], {
  stdio: "inherit",
  env: { ...process.env, HOST: "0.0.0.0" },
  shell: true,
});

child.on("error", (err) => {
  debugLog("craco spawn error", { message: err.message, code: err.code }, "H9");
  process.exit(1);
});

child.on("exit", (code, signal) => {
  debugLog("craco exited", { code, signal }, "H9");
  process.exit(code ?? 1);
});
