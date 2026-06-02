const webpack = require("webpack");

/** Local dev server: bind all interfaces and honor APPSPACE_PORT/PORT if provided. */
function resolveDevServerPort() {
  const raw = process.env.APPSPACE_PORT ?? process.env.PORT;
  if (raw == null || String(raw).trim() === "") return undefined;
  const port = Number(raw);
  return Number.isFinite(port) ? port : undefined;
}

const devServerPort = resolveDevServerPort();
const devServer = {
  host: "0.0.0.0",
  allowedHosts: "all",
  ...(devServerPort != null ? { port: devServerPort } : {}),
};

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
