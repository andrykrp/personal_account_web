require('../utils/dotenv');

const
    webpack = require('webpack'),
    path = require('path'),
    webpackMerge = require('webpack-merge');

const ENVIRONMENTS = require('../constants/environments');

const
    devConfig = require('./environment/dev'),
    prodConfig = require('./environment/prod'),
    aliasesConfig = require('./aliases.confing');

const ENVIRONMENT_CONFIG_MAP = {
    [ENVIRONMENTS.DEV]: devConfig,
    [ENVIRONMENTS.PRODUCTION]: prodConfig
};

const
    PATHS = {
        nodeModules: path.join(__dirname, '../../node_modules'),
        app: path.join(__dirname, '../../front/app'),
        build: path.join(__dirname, '../../dist')
    },
    ENVIRONMENT_CONFIG = ENVIRONMENT_CONFIG_MAP[ENVIRONMENTS.CURRENT] || prodConfig;

const common = {
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
        modules: [PATHS.nodeModules]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    module: {
        rules: [{
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff2'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-otf'
        }, {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?name=[name].[ext]'
        }]
    },
    plugins: [
        new webpack.PrefetchPlugin('bluebird'),
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${ENVIRONMENTS.CURRENT}"`,
                API_HOST: `"${process.env.API_HOST}"`,
                RESOURCES_HOST: `"${process.env.RESOURCES_HOST}"`
            }
        })
    ]
};

module.exports = webpackMerge(ENVIRONMENT_CONFIG, aliasesConfig, common);
