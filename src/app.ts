const express = require('express');

const routes = require ('./routes/routes');
const connect = require('./database/database');

const app = express();
const port = 3000;

connect();

app.use('/', routes);
app.set('port', port);
app.listen(port);

module.exports = app;
