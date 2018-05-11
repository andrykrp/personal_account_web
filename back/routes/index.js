const path = require('path');

module.exports = app => {
    app.get(/.*/, (request, response) => {
        response.sendFile(path.resolve('./front/index.html'));
    });
};
