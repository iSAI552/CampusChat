import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
    },
    attachments: [{
        url: {
            type: String,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    }],
    seen: {
        type: Boolean,
        default: false,
    }


}, { timestamps: true })

export const Message = model("Message", messageSchema)