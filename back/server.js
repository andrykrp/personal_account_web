require('./utils/dotenv');

const
    path = require('path'),
    express = require('express'),
    http = require('http');

const
    ENVIRONMENTS = require('./constants/environments'),
    initRoutes = require('./routes');

const
    app = express(),
    server = http.createServer(app);

if (ENVIRONMENTS.CURRENT === ENVIRONMENTS.DEV) {
    require('./utils/babel');
    require('./utils/webpack')(express, app);
} else {
    app.use('/dist', express.static(path.resolve('dist')));
}

app.use('/img', express.static(path.resolve('./front/resources/img')));

initRoutes(app);

server.listen(process.env.PORT, () => {
    console.log(`Environment: ${ENVIRONMENTS.CURRENT}`);
    console.log(`Listening on: ${process.env.PORT}`);
});
