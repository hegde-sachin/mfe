const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require("./webpack.common");

const packageJson = require('../package.json');

const devPort = 8080;

const devConfig = {
  mode: "development",
  output: {
    publicPath: `http://localhost:${devPort}/`
  },
  devServer: {
    port: devPort,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        'marketing': 'marketing@http://localhost:8081/remoteEntry.js',
        'auth': 'auth@http://localhost:8082/remoteEntry.js',
        'dashboard': 'dashboard@http://localhost:8083/remoteEntry.js',
      },
      shared: packageJson.dependencies
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
