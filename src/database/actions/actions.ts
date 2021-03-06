import mongoose, {Document, Schema} from "mongoose";

import ConsentTypes from '../../enums/ConsentTypes';
import  { IUser }  from '../users/user';

export interface IAction extends Document{
    title: string,
    description: string,
    requiredConsentTypes: ConsentTypes[],
    isRemoteFriendly: boolean,
    level: number,
    createdBy: IUser['_id'],
    numberOfParticipants: number
}


const ActionSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredConsentTypes: {type: Array, required: true},
    isRemoteFriendly: { type: Boolean, required: true },
    level: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId },
    numberOfParticipants: { type: Number, max: 15, min: 1}
});

export default mongoose.model<IAction>('Action', ActionSchema);
