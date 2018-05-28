const
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const { cssLoader, cssLoaderWithModules, postCssLoader } = require('../loader/loader');

module.exports = {
    entry: [
        './front/app/app.jsx'
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', cssLoader, postCssLoader]
            },
            {
                test: /\.pcss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        cssLoaderWithModules,
                        postCssLoader
                    ]
                })
            }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css'
        })
        // todo раскомментировать
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};
