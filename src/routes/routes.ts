import express from 'express';
import bodyParser from 'body-parser';
import { validate, ValidationError, Joi } from 'express-validation';

const { fetchPrompt, createPrompt } = require('../controllers/promptController');
const { createUser } = require('../controllers/userController');

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

const userCreateRequestValidation = {
  body: Joi.object({
      email: Joi.string().email().required(),
      userName: Joi.string().required()
  })
};

app.post('/request_prompt', validate(promptRequestValidation, {}, {}), (req: any, res: any) => {
    fetchPrompt(req, res);
});

app.post('/create_prompt', validate(promptCreationRequestValidation, {}, {}), (req: any, res: any) => {
   createPrompt(req, res);
});

app.post('/create_user', validate(userCreateRequestValidation, {}, {}),  createUser);
