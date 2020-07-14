import { Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    userName: string;
    isEmailVerified: boolean;
}
