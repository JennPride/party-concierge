import { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    userName: string;
    password: string;
    emailVerificationCode?: string;
    isEmailVerified: boolean;
}

export const UserSchema: Schema = new Schema({
    email: { type: String, unique: true, required: true},
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    isEmailVerified: { type: Boolean, required: true },
    emailVerificationCode: { type: String }
});


export default mongoose.model<IUser>('User', UserSchema);
