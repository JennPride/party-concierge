const express = require('express');
const app = express();
const port = 3000;

const routes = require ('./src/routes/routes');

app.use('/', routes);
app.set('port', port);
app.listen(port);

module.exports = app;
