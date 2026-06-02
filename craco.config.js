const webpack = require("webpack");

/**
 * AppSpace ingress probes container :80 while APPSPACE_PORT is 3000.
 * Use :80 in production so health checks pass without a startup build (which OOMs).
 */
function resolveDevServerPort() {
  if (process.env.NODE_ENV === "production") {
    return 80;
  }

  const raw = process.env.APPSPACE_PORT ?? process.env.PORT;
  if (raw == null || String(raw).trim() === "") return undefined;
  const port = Number(raw);
  return Number.isFinite(port) ? port : undefined;
}

const appspaceEnvPort = process.env.APPSPACE_PORT ?? process.env.PORT ?? null;
const devServerPort = resolveDevServerPort();
const portResolution =
  process.env.NODE_ENV === "production"
    ? "production-ingress-80"
    : appspaceEnvPort != null
      ? "env"
      : "cra-default";
const devServer = {
  host: "0.0.0.0",
  allowedHosts: "all",
  ...(devServerPort != null ? { port: devServerPort } : {}),
};

// #region agent log
console.error(
  "[appspace-debug]",
  JSON.stringify({
    sessionId: "056c63",
    hypothesisId: "H9",
    location: "craco.config.js:devServer",
    message: "devServer config resolved",
    data: {
      APPSPACE_PORT: process.env.APPSPACE_PORT ?? null,
      PORT: process.env.PORT ?? null,
      HOST: process.env.HOST ?? null,
      NODE_ENV: process.env.NODE_ENV ?? null,
      appspaceEnvPort,
      portResolution,
      devServerPort: devServerPort ?? null,
      devServerHost: devServer.host,
    },
    timestamp: Date.now(),
    runId: process.env.DEBUG_RUN_ID ?? "pre-fix",
  })
);
// #endregion

/** Rosetta composition packages expect Metro's global __DEV__. CRA web bundles don't define it. */
module.exports = {
  devServer,
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
        })
      );
      return webpackConfig;
    },
  },
};
