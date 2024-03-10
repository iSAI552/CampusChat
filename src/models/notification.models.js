import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    notificationType: {
        type: String,
        required: true,
    },
    
}, { timestamps: true })

// make a function that calculates sum of n integers

export const Notification = model("Notification", notificationSchema)