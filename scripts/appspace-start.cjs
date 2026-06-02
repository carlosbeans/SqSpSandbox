const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
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
  // AppSpace ingress probes container :80; APPSPACE_PORT is often 3000 (CRA default).
  if (process.env.NODE_ENV === "production") {
    return 80;
  }

  const raw = process.env.APPSPACE_PORT ?? process.env.PORT ?? "3000";
  const port = Number(raw);
  return Number.isFinite(port) ? port : 3000;
}

function listenEndpoint(port) {
  return `tcp://0.0.0.0:${port}`;
}

function startPlaceholderServer(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Starting carlos-domains-sandbox…");
    });

    server.on("error", (err) => {
      debugLog(
        "placeholder listen failed",
        { port, code: err.code, message: err.message },
        "H2"
      );
      reject(err);
    });

    server.listen(port, "0.0.0.0", () => {
      debugLog("placeholder listening", { port }, "H2");
      resolve(server);
    });
  });
}

function runProductionBuild(projectRoot) {
  const startedAt = Date.now();
  debugLog("running production build", { startedAt }, "H7");

  const build = spawnSync(
    "npm",
    ["run", "build"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        CI: "true",
        GENERATE_SOURCEMAP: "false",
      },
      cwd: projectRoot,
    }
  );

  const durationMs = Date.now() - startedAt;
  debugLog(
    "production build finished",
    {
      durationMs,
      status: build.status,
      signal: build.signal,
      error: build.error ? build.error.message : null,
    },
    "H7"
  );

  return build;
}

function startStaticServer({ serveBin, listenPort, projectRoot }) {
  debugLog(
    "spawning serve",
    { listenPort, listenEndpoint: listenEndpoint(listenPort), serveBin },
    "H8"
  );

  const serve = spawn(
    serveBin,
    ["-s", "build", "-l", listenEndpoint(listenPort), "--no-clipboard"],
    {
      stdio: "inherit",
      env: { ...process.env, HOST: "0.0.0.0" },
      cwd: projectRoot,
    }
  );

  serve.on("error", (err) => {
    debugLog(
      "serve spawn error",
      { message: err.message, code: err.code },
      "H8"
    );
    process.exit(1);
  });

  serve.on("exit", (code, signal) => {
    debugLog("serve exited", { code, signal }, "H8");
    process.exit(code ?? 1);
  });

  setTimeout(() => {
    const req = http.get(
      { host: "127.0.0.1", port: listenPort, path: "/", timeout: 5000 },
      (res) => {
        debugLog(
          "listen probe success",
          { statusCode: res.statusCode, listenPort },
          "H8"
        );
        res.resume();
      }
    );
    req.on("error", (err) => {
      debugLog(
        "listen probe failed",
        { error: err.message, listenPort },
        "H8"
      );
    });
  }, 4000);

  return serve;
}

const isProduction = process.env.NODE_ENV === "production";
const listenPort = resolveListenPort();
const serveBin = path.join(__dirname, "..", "node_modules", ".bin", "serve");
const projectRoot = path.join(__dirname, "..");
const buildIndex = path.join(projectRoot, "build", "index.html");

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

async function startProduction() {
  debugLog(
    "production static serve",
    {
      NODE_ENV: process.env.NODE_ENV,
      APPSPACE_PORT: process.env.APPSPACE_PORT ?? null,
      PORT: process.env.PORT ?? null,
      listenPort,
      hasBuild: fs.existsSync(buildIndex),
      portResolution: "production-ingress-80",
    },
    "H1"
  );

  let placeholder;
  try {
    placeholder = await startPlaceholderServer(listenPort);
  } catch (err) {
    process.exit(1);
  }

  const build = runProductionBuild(projectRoot);
  if (build.status !== 0) {
    debugLog(
      "production build failed",
      { status: build.status, signal: build.signal },
      "H7"
    );
    process.exit(build.status ?? 1);
  }

  await new Promise((resolve, reject) => {
    placeholder.close((err) => (err ? reject(err) : resolve()));
  });
  debugLog("placeholder closed before serve", { listenPort }, "H2");

  startStaticServer({ serveBin, listenPort, projectRoot });
}

startProduction().catch((err) => {
  debugLog("startProduction failed", { message: err.message }, "H2");
  process.exit(1);
});
