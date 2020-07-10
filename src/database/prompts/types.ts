import { Document, Model } from "mongoose";

export interface IPrompt {
    title: string,
    description: string,
    requiredConsentTypes: ConsentTypes[],
    isRemoteFriendly: boolean,
    isInPersonFriendly: boolean,
    level: number
}

export interface IPromptDocument extends IPrompt, Document {}
export interface IPromptModel extends Model<IPromptDocument> {}
