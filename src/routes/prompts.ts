import express from 'express';
import Joi from 'joi';

import { createPrompt, fetchPrompt } from '../controllers/promptController';
import { validateSchema }  from './middleware';
import Levels from "../enums/Levels";
import PromptTypes from "../enums/PromptTypes";

const validLevels = Object.values(Levels);
const validTypes = Object.values(PromptTypes);

const promptCreateRequestSchema =
    Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        isRemoteFriendly: Joi.boolean().required(),
        level: Joi.number().valid(...validLevels).required(),
        type: Joi.string().valid(...validTypes).required(),
        createdBy: Joi.string(),
    }).required();

const promptFetchRequestSchema =
    Joi.object({
        isRemoteFriendly: Joi.boolean().required(),
        level: Joi.number().valid(...validLevels),
        type: Joi.string().valid(...validTypes).required(),
        excludedPromptIds: Joi.array().required(),
        requesterId: Joi.string()
    }).required();


let router = express.Router();

router.post('/create', validateSchema(promptCreateRequestSchema, 'body'), createPrompt);
router.post('/fetch', validateSchema(promptFetchRequestSchema, 'body'), fetchPrompt);

module.exports = router;
