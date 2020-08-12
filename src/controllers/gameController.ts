import express from "express";

import Game from "../database/games/game";
import {defaultUserId} from "../const/GameConsts";

export async function createGame(req: express.Request, res: express.Response): Promise<any> {

    const {userId, players, level} = req.body;

    const game = new Game({
        createdBy: userId || defaultUserId,
        players,
        level,
        createdAt: Date.now()
    });

    try {
        const createdGame = await Game.create(game);
        if (createdGame.errors) {
            res.status(500).send({error: { 'meta' : createdGame.errors}});
        } else {
            res.status(200).send({createdGame});
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ 'error' : { 'message' : 'Unknown error encountered when trying to create user.'}})
    }
}
