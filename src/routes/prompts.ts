import express from 'express';
import Joi from 'joi';

import { createPrompt } from '../controllers/promptController';
import { validateSchema }  from './middleware';
import ConsentTypes from "../enums/ConsentTypes";
import {IUser} from "../database/users/user";
import Levels from "../enums/Levels";

const validLevels = Object.values(Levels);

const promptCreateRequestSchema =
    Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        isRemoteFriendly: Joi.boolean().required(),
        level: Joi.number().valid(...validLevels),
        creator: Joi.string().required()
    }).required();


let router = express.Router();

router.post('/create', validateSchema(promptCreateRequestSchema, 'body'), createPrompt);


module.exports = router;
