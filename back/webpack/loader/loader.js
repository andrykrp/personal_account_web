const
    autoprefixer = require('autoprefixer'),
    postcssCustomProperties = require('postcss-custom-properties');

const
    ENVIRONMENTS = require('../../constants/environments'),
    isProduction = ENVIRONMENTS.CURRENT === ENVIRONMENTS.PRODUCTION;

const
    cssLoader = {
        loader: 'css-loader',
        options: {
            importLoaders: 1
        }
    },
    cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: true,
            importLoaders: 1,
            localIdentName: isProduction ? '[hash:base64]' : '[name]__[local]___[hash:base64:5]'
        }
    },
    postCssLoader = {
        loader: 'postcss-loader',
        options: {
            plugins: () => (
                [
                    autoprefixer({
                        browsers: ['last 2 versions']
                    }),
                    postcssCustomProperties
                ]
            )
        }
    };

module.exports = { cssLoader, cssLoaderWithModules, postCssLoader };
