const path = require('path');
const request = require('request');

module.exports = app => {
    app.use('/api', function(req, res) {
        let method, r;

        method = req.method.toLowerCase().replace(/delete/, 'del');
        switch (method) {
            case 'options':
            case 'get':
            case 'post':
            case 'del':
            case 'put':
                r = request[method]({
                    uri: process.env.API_HOST + '/api' + req.url,
                    json: req.body, jar: true
                });
                break;
            default:
                return res.send('invalid method');
        }

        r.on('error', () => {
            console.log('Handle request error');
        });

        return req.pipe(r).pipe(res);
    });

    app.get(/.*/, (request, response) => {
        response.sendFile(path.resolve('./front/index.html'));
    });
};
