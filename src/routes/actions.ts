import express from 'express';
import Joi from 'joi';

import { createAction, fetchAction } from '../controllers/actionController';
import { validateSchema }  from './middleware';
import ConsentTypes from "../enums/ConsentTypes";
import Levels from "../enums/Levels";

const validLevels = Object.values(Levels);
const validConsentTypes = Object.values(ConsentTypes);

const actionCreateRequestSchema =
    Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        isRemote: Joi.boolean().required(),
        level: Joi.number().valid(...validLevels).required(),
        createdBy: Joi.string(),
        numberOfParticipants: Joi.number(),
        requiredConsentTypes: Joi.array().items(Joi.string().valid(...validConsentTypes)).required()
    }).required();

const actionFetchRequestSchema =
    Joi.object({
        excludedActionIds: Joi.array().required(),
        isRemoteFriendly: Joi.boolean().required(),
        level: Joi.number().valid(...validLevels),
        requiredConsentTypes: Joi.array().items(Joi.string().valid(...validConsentTypes)).required(),
        requesterId: Joi.string(),
        numberOfParticipants: Joi.number().required()
    }).required();


const router = express.Router();

router.post('/create', validateSchema(actionCreateRequestSchema, 'body'), createAction);
router.post('/fetch', validateSchema(actionFetchRequestSchema, 'body'), fetchAction);

module.exports = router;
