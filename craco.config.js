const webpack = require("webpack");

/** AppSpace and similar hosts expose the listening port via APPSPACE_PORT. */
const appspacePort = process.env.APPSPACE_PORT;
const devServer =
  appspacePort != null && String(appspacePort).trim() !== ""
    ? { port: Number(appspacePort) }
    : {};

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
