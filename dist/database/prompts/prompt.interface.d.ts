import { Document } from "mongoose";
import ConsentTypes from "../../enums/ConsentTypes";
import { IUser } from '../users/user.interface';
export interface IPrompt extends Document {
    title: string;
    description: string;
    requiredConsentTypes: ConsentTypes[];
    isRemoteFriendly: boolean;
    isInPersonFriendly: boolean;
    level: number;
    createdBy: IUser['_id'];
}
