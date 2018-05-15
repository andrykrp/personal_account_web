const
    fs = require('fs'),
    path = require('path');

let config;

try {
    config = JSON.parse(fs.readFileSync(path.resolve('.babelrc')));
} catch (err) {
    console.log('ERROR: Error parsing your .babelrc.');
}
require('babel-core/register')(config);
