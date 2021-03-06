import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const users = require('./routes/users');
const prompts = require('./routes/prompts');
const games = require('./routes/games');
const actions = require('./routes/actions');
const { connect } = require('./database/database');

connect();

const app = express();

const port = 3001;

app.set('port', port);

app.use(bodyParser.json(), cors());

app.use('/users', users);
app.use('/prompts', prompts);
app.use('/games', games);
app.use('/actions', actions);

app.listen((port), () => console.log(`Server running on port ${port}`));

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    return res.status(500).json(err)
});

module.exports = app;
