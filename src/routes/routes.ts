const express = require('express');
const bodyParser = require('body-parser');
const { validate, ValidationError, Joi } = require('express-validation');

const { fetchQuestion } = require('../controllers/questionController');

const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors);

const questionRequestValidation = {
    body: Joi.object({
        level: Joi.number().required(),
        isRemote: Joi.boolean().required(),
        allowedCategories: Joi.array()
    })
};

app.post('/request_question', validate(questionRequestValidation, {}, {}), (req: any, res: any) => {
    fetchQuestion(req, res);
});
