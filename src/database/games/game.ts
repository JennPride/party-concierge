import { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";
import Player from "../../interfaces/player";
import Levels from "../../enums/Levels";

export interface IGame extends Document {
    players: Player[],
    createdAt: Date,
    roundsCompleted: number,
    level: Levels
}

export const GameSchema: Schema = new Schema({
    players: { type: Array, required: true},
    createdAt: { type: Date, required: true},
    roundsCompleted: { type: Number, required: true},
    level: { type: Number, enum: Levels, required: true},
});


export default mongoose.model<IGame>('Game', GameSchema);
