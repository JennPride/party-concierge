import express from 'express';
import { difference } from 'lodash';

import Action from "../database/actions/actions";
import {Document} from "mongoose";
import ConsentTypes from "../enums/ConsentTypes";
import {IUser} from "../database/users/user";
import {ALL_CONSENT_TYPES} from "../const/ConsentTypes";


export interface IAction extends Document{
    title: string,
    description: string,
    requiredConsentTypes: ConsentTypes[],
    isRemote: boolean,
    level: number,
    createdBy: IUser['_id'],
    numberOfParticipants: number
}

export async function createAction(req: express.Request, res: express.Response): Promise<any> {

    const {
        title,
        description,
        isRemoteFriendly,
        level,
        createdBy,
        numberOfParticipants,
        requiredConsentTypes
    } = req.body;

    const action = new Action({
        title,
        description,
        isRemoteFriendly,
        level,
        createdBy,
        numberOfParticipants,
        requiredConsentTypes
    });

    try {
        const createdAction = await Action.create(action);
        if (createdAction.errors) {
            res.status(500).send({error: {'meta': createdAction.errors}});
        } else {
            res.status(200).send({createdAction});
        }
    } catch (e) {
        res.status(500).send({ 'error' : { 'message' : 'An unknown error occurred when creating the action.'}})
    }
}

export async function fetchAction(req: express.Request, res: express.Response) {

    const {
        excludedActionIds,
        isRemote,
        level,
        requesterId: createdBy,
        numberOfParticipants,
        requiredConsentTypes
    } = req.body;

    const notOkConsentTypes = difference(requiredConsentTypes, ALL_CONSENT_TYPES);

    let searchObject = {
        _id: { $nin: excludedActionIds },
        level: { $lte: level},
        numberOfParticipants,
        requiredConsentTypes: { $nin: notOkConsentTypes}
    };

    if (isRemote) {
        searchObject = {...searchObject, ...{isRemoteFriendly: true}};
    }

    if (createdBy) {
        searchObject = {...searchObject, ...{ $or: [ {createdBy: { $exists: false }}, { createdBy } ]}};
    } else {
        searchObject = { ...searchObject, ...{ createdBy : { $exists: false}}};
    }

    try {
        const action = await Action.findOne(searchObject);

        if (!action) {
            res.status(500).send({error: {'message': 'No action found that matches that request.'}})
        } else if (action.errors) {
            res.status(500).send({error: {'meta': action.errors}});
        } else {
            res.status(200).send({action});
        }

    } catch (e) {
        res.send(500).send({'error' : { 'message' : 'An unknown error occurred when fetching a action'}});
    }
}
