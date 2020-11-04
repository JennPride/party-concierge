"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users = require('./routes/users');
const prompts = require('./routes/prompts');
const games = require('./routes/games');
const actions = require('./routes/actions');
const { connect } = require('./database/database');
connect();
const app = express_1.default();
const port = 3000;
app.set('port', port);
app.use(body_parser_1.default.json(), cors_1.default());
app.use('/users', users);
app.use('/prompts', prompts);
app.use('/games', games);
app.use('/actions', actions);
app.listen((port), () => console.log(`Server running on port ${port}`));
app.use((err, req, res, next) => {
    return res.status(500).json(err);
});
module.exports = app;
//# sourceMappingURL=app.js.map