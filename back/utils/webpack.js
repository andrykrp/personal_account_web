const
    webpack = require('back/utils/webpack'),
    webpackConfig = require('../webpack/common.config.js'),
    compiler = webpack(webpackConfig);

const
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = (express, app) => {
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            children: false,
            modules: false,
            warnings: false,
            maxModules: 0
        }
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
};