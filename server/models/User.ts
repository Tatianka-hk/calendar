import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    googleID: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, unique: false },
    password: { type: String, unique: false },
    googleID: { type: String, unique: false },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
