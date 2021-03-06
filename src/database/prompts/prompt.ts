import mongoose, {Document, Schema} from "mongoose";
import  { IUser }  from '../users/user';
import PromptTypes from "../../enums/PromptTypes";

export interface IPrompt extends Document{
    title: string,
    description: string,
    isRemoteFriendly: boolean,
    level: number,
    createdBy: IUser['_id'],
    type: PromptTypes,
}


const PromptSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isRemoteFriendly: { type: Boolean, required: true },
    level: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId },
    type: { type: String, required: true}
});

export default mongoose.model<IPrompt>('Prompt', PromptSchema);
