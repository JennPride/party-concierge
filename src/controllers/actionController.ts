import express from 'express';
import Action from "../database/actions/actions";
import {Document} from "mongoose";
import ConsentTypes from "../enums/ConsentTypes";
import {IUser} from "../database/users/user";


export interface IAction extends Document{
    title: string,
    description: string,
    requiredConsentTypes: ConsentTypes[],
    isRemoteFriendly: boolean,
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
        isRemoteFriendly,
        level,
        requesterId: createdBy,
        numberOfParticipants,
        requiredConsentTypes
    } = req.body;

    let searchObject = {
        _id: { $nin: excludedActionIds },
        isRemoteFriendly,
        level: { $lte: level},
        numberOfParticipants,
        requiredConsentTypes: { $all: requiredConsentTypes}
    };

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
