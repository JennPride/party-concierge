import express from 'express';
import Joi from 'joi';

import { createGame } from '../controllers/gameController';
import { validateSchema }  from './middleware';
import ConsentTypes from "../enums/ConsentTypes";
import Levels from "../enums/Levels";

const validConsentTypes = Object.values(ConsentTypes);
const validLevels = Object.values(Levels);

const gamePlayersSchema =
    Joi.object({
        name: Joi.string().required(),
        consentTypes: Joi.string().valid(...validConsentTypes)
    });

const gameCreateRequestSchema =
    Joi.object({
        userId: Joi.string(),
        players: Joi.array().items(gamePlayersSchema).required(),
        level: Joi.number().valid(...validLevels).required(),
    }).required();


const router = express.Router();

router.post('/create', validateSchema(gameCreateRequestSchema, 'body'), createGame);


module.exports = router;
