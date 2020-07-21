import bcrypt from 'bcrypt';
import express from 'express';
import {SALT_ROUNDS} from "../const/Authentication";

import User from '../database/users/user';

export async function createUser(req: express.Request, res: express.Response): Promise<any> {

    const {email, userName, password } = req.body;

    const hashPass = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
        email,
        userName,
        isEmailVerified: false,
        password: hashPass
    });

    try {
        const createdUser = await User.create(user);
        if (createdUser.errors) {
            res.status(500).send({error: { 'meta' : createdUser.errors}});
        } else {
            res.status(200).send({createdUser});
        }
    } catch (e) {
        const { name, message } = e;
        if (name === 'MongoError' && message.includes('duplicate key error')) {
            let issueValue = `those credentials`;
            if (message.includes('email_1 dup key')) {
                issueValue = `that email address`;
            } else if (message.includes('userName_1 dup key')) {
                issueValue = `that username`;
            } else {
                // TODO: log error
            }
            res.status(400).send({'error' : { 'message' : `A user with ${issueValue} already exists!`}});
        } else {
            res.status(500).send({ 'error' : { 'message' : 'Unknown error encountered when trying to create user.'}})
        }
    }
}
