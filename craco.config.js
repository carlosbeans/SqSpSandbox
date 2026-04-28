const webpack = require("webpack");

/** Rosetta composition packages expect Metro's global __DEV__. CRA web bundles don't define it. */
module.exports = {
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
