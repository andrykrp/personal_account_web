const webpack = require('webpack');

const { cssLoader, cssLoaderWithModules, postCssLoader } = require('../loader/loader');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './front/app/app.jsx'
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', cssLoader, postCssLoader]
            }, {
                test: /\.pcss$/,
                use: ['style-loader', cssLoaderWithModules, postCssLoader]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
