import bcrypt from 'bcrypt';
import express from 'express';
import {SALT_ROUNDS} from "../const/Authentication";

import User from '../database/users/user.model';

export async function createUser(req: express.Request, resp: express.Response): Promise<any> {

    const {email, userName, password } = req.body;

    const hashPass = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
        email,
        userName,
        isEmailVerified: false,
        password: hashPass
    });

    const fuckThis = await user.save;

    return fuckThis;
};
