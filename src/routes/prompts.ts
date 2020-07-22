import express from 'express';
import Joi from 'joi';

import { createPrompt, fetchPrompt } from '../controllers/promptController';
import { validateSchema }  from './middleware';
import ConsentTypes from "../enums/ConsentTypes";
import Levels from "../enums/Levels";

const validLevels = Object.values(Levels);
const validConsentTypes = Object.values(ConsentTypes);

const promptCreateRequestSchema =
    Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        isRemoteFriendly: Joi.boolean().required(),
        level: Joi.number().valid(...validLevels).required(),
        createdBy: Joi.string(),
        numberOfParticipants: Joi.number(),
        requiredConsentTypes: Joi.array().items(Joi.string().valid(...validConsentTypes)).required()
    }).required();

const promptFetchRequestSchema =
    Joi.object({
        isRemoteFriendly: Joi.boolean().required(),
        level: Joi.number().valid(...validLevels),
        requiredConsentTypes: Joi.array().items(Joi.string().valid(...validConsentTypes)).required(),
        excludedPromptIds: Joi.array().required(),
        requesterId: Joi.string()
    }).required();


let router = express.Router();

router.post('/create', validateSchema(promptCreateRequestSchema, 'body'), createPrompt);
router.post('/fetch', validateSchema(promptFetchRequestSchema, 'body'), fetchPrompt);

module.exports = router;
