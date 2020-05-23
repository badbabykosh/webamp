const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  devtool: "source-map",
  mode: "production",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            envName: "library",
          },
        },
      },
    ],
    noParse: [/jszip\.js$/],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "library-report.html",
      openAnalyzer: false,
    }),
  ],
  performance: {
    // We do some crazy shit okay! Don't judge!
    maxEntrypointSize: 9000000,
    maxAssetSize: 9000000,
  },
  entry: {
    bundle: "./js/webamp.ts",
    "bundle.min": "./js/webamp.ts",
    "lazy-bundle": "./js/webampLazy.tsx",
    "lazy-bundle.min": "./js/webampLazy.tsx",
  },
  output: {
    path: path.resolve(__dirname, "../built"),
    filename: "webamp.[name].js",
    library: "Webamp",
    libraryTarget: "umd",
    libraryExport: "default",
  },
};
