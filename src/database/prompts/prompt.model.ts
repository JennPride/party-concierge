import mongoose, { Schema } from "mongoose";

import { IPrompt } from './prompt.interface';
import ConsentTypes from '../../enums/ConsentTypes';

const PromptSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredConsentTypes: { type: [ConsentTypes], required: true },
    isRemoteFriendly: { type: Boolean, required: true },
    level: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId }
});

export default mongoose.model<IPrompt>('Prompt', PromptSchema);
