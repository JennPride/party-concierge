import express from 'express';
import bodyParser from 'body-parser';
import { validate, ValidationError, Joi } from 'express-validation';

const { fetchPrompt, createPrompt } = require('../controllers/promptController');
const { createUser } = require('../controllers/userController');


const router = express.Router();

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

router.get('/', (req: any, res: any) => {
    res.send('hello');
});

router.post('/request_prompt', validate(promptRequestValidation, {}, {}), (req: any, res: any) => {
    fetchPrompt(req, res);
});

router.post('/create_prompt', validate(promptCreationRequestValidation, {}, {}), (req: any, res: any) => {
   createPrompt(req, res);
});

module.exports = router;
