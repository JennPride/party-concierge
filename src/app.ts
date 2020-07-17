import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const users = require('./routes/users');
const { connect } = require('./database/database');

connect();

const app = express();

const port = 3000;

app.set('port', port);

app.use(bodyParser.json());

app.use('/users', users);

app.listen((port), () => console.log(`Server running on port ${port}`));

// app.use((err: any, req: express.Request, res: express.Response, next: any) => {
//     if (err instanceof ValidationError) {
//         return res.status(err.statusCode).json(err)
//     }
//
//     return res.status(500).json(err)
// });

module.exports = app;
