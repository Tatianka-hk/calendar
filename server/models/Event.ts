import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
    name: string;
    description: string;
    date: Date;
    time: string;
    userID: Schema.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>({
    name: { type: String, unique: false },
    description: { type: String, unique: false },
    time: { type: String, unique: false },
    date: { type: Date, unique: false },
    userID: { type: Schema.Types.ObjectId, ref: "User", unique: false },
});

const Event = mongoose.model<IEvent>("Event", eventSchema);
export default Event;
