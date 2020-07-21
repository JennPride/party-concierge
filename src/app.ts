import express from 'express';
import bodyParser from 'body-parser';

const users = require('./routes/users');
const prompts = require('./routes/prompts');
const { connect } = require('./database/database');

connect();

const app = express();

const port = 3000;

app.set('port', port);

app.use(bodyParser.json());

app.use('/users', users);
app.use('/prompts', prompts);

app.listen((port), () => console.log(`Server running on port ${port}`));

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    return res.status(500).json(err)
});

module.exports = app;
