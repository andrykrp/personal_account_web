/* для указывания в IntelliJ Idea в качестве webpack-конфига, для нормальных импортов */
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            actions: path.resolve('./front/app/actions'),
            components: path.resolve('./front/app/components'),
            constants: path.resolve('./front/app/constants'),
            middlewares: path.resolve('./front/app/middlewares'),
            store: path.resolve('./front/app/store'),
            styles: path.resolve('./front/app/styles'),
            reducers: path.resolve('./front/app/reducers'),
            utils: path.resolve('./front/app/utils')
        }
    }
};
