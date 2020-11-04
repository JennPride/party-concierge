import express from 'express';
import Joi from 'joi';

import { createUser } from '../controllers/userController';
import { validateSchema }  from './middleware';

const userCreateRequestSchema =
    Joi.object({
        email: Joi.string().email().min(6).required(),
        userName: Joi.string().min(6).required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }).required();


const router = express.Router();

router.post('/create', validateSchema(userCreateRequestSchema, 'body'), createUser);


module.exports = router;
