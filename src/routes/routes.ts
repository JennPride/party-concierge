const express = require('express');
const bodyParser = require('body-parser');
const { validate, ValidationError, Joi } = require('express-validation');

const { fetchPrompt, createPrompt } = require('../controllers/promptController');

const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors);

const promptRequestValidation = {
    body: Joi.object({
        level: Joi.number().required(),
        isRemote: Joi.boolean().required(),
        consentCategories: Joi.array().required(),
    })
};

const promptCreationRequestValidation = {
    body: Joi.object( {
        userId: Joi.number().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        level: Joi.number().required(),
        isRemote: Joi.boolean().required(),
        consentCategories: Joi.array().required(),
    })
};

app.post('/request_prompt', validate(promptRequestValidation, {}, {}), (req: any, res: any) => {
    fetchPrompt(req, res);
});

app.post('/create_prompt', validate(promptCreationRequestValidation, {}, {}), (req: any, res: any) => {
   createPrompt(req, res);
});
