'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  pureConfig: {
       devtool: 'eval',
    output: {
      path: path.join(__dirname, '/../build/assets'),
      filename: 'app.js',
      publicPath: defaultSettings.publicPath
    },
    devServer: {
      contentBase: './frontend/src/',
      historyApiFallback: true,
      hot: true,
      port: defaultSettings.port,
      publicPath: defaultSettings.publicPath,
      noInfo: false
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        shared: `${defaultSettings.appRootPath}/shared/`,

        actions: `${defaultSettings.srcPath}/actions/`,
        components: `${defaultSettings.srcPath}/components/`,
        store: `${defaultSettings.srcPath}/store/`,
        reducers: `${defaultSettings.srcPath}/reducers/`,
        config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
        utils: `${defaultSettings.srcPath}/utils/`,
        'react/lib/ReactMount': 'react-dom/lib/ReactMount'
      }
    },
    module: {}
  },
  extras: {
    port: defaultSettings.port,
    additionalPaths: additionalPaths,
  }
};
