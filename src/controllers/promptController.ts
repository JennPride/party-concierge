import express from 'express';
import Prompt from "../database/prompts/prompt";

export async function createPrompt(req: express.Request, res: express.Response): Promise<any> {

    const {
        title,
        description,
        isRemoteFriendly,
        level,
        createdBy,
        requiredConsentTypes,
        numberOfParticipants,
    } = req.body;

    const prompt = new Prompt({
        title,
        description,
        isRemoteFriendly,
        level,
        createdBy,
        requiredConsentTypes,
        numberOfParticipants,
    });

    try {
        const createdPrompt = await Prompt.create(prompt);
        if (createdPrompt.errors) {
            res.status(500).send({error: {'meta': createdPrompt.errors}});
        } else {
            res.status(200).send({createdPrompt});
        }
    } catch (e) {
        res.status(500).send({ 'error' : { 'message' : 'An unknown error occurred when creating the prompt.'}})
    }
}

export async function fetchPrompt(req: express.Request, res: express.Response) {

    const {
        excludedPromptIds,
        isRemoteFriendly,
        level,
        requiredConsentTypes: consentTypes,
        requesterId: createdBy,
    } = req.body;

    let searchObject = {
        _id: { $nin: excludedPromptIds },
        isRemoteFriendly,
        level: { $lte: level},
        requiredConsentTypes: { $all : consentTypes}
    };

    if (createdBy) {
        searchObject = {...searchObject, ...{ $or: [ {createdBy: { $exists: false }}, { createdBy } ]}};
    } else {
        searchObject = { ...searchObject, ...{ createdBy : { $exists: false}}};
    }

    try {
        const prompt = await Prompt.findOne(searchObject);

        if (!prompt) {
            res.status(500).send({error: {'message': 'No prompt found that matches that request.'}})
        } else if (prompt.errors) {
            res.status(500).send({error: {'meta': prompt.errors}});
        } else {
            res.status(200).send({prompt});
        }

    } catch (e) {
        res.send(500).send({'error' : { 'message' : 'An unknown error occurred when fetching a prompt'}});
    }
}
