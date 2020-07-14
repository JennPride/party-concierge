import mongoose, { Schema } from "mongoose";
import { IUser } from './user.interface';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
