const express = require('express');

const routes = require ('./src/routes/routes');
import { connect } from "./src/database/database";

const app = express();
const port = 3000;

connect();

app.use('/', routes);
app.set('port', port);
app.listen(port);

module.exports = app;
