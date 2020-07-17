import Joi  from 'joi';
import { get } from 'lodash';
import express from 'express';

export function validateSchema(schema: Joi.ObjectSchema, parameter: string): any {
    return (req: express.Request, res: express.Response, next: any) => {
        // @ts-ignore
        const validationObj = get(req, parameter);
        const { error } = schema.validate(validationObj);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i: any) => i.message).join(',');

            console.log("error", message);
            res.status(422).json({ error: message })
        }
    }
}

