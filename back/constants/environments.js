const { find, values } = require('ramda');

const ENVIRONMENTS = {
    DEV: 'dev',
    PRODUCTION: 'production'
};

function getEnvironment(lifecycleEvent) {
    const environment = find(item => item === lifecycleEvent, values(ENVIRONMENTS));

    return environment || ENVIRONMENTS.PRODUCTION;
}

ENVIRONMENTS.CURRENT = getEnvironment(process.env.NODE_ENV);

module.exports = ENVIRONMENTS;
