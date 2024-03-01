import { Schema, model } from "mongoose";

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Group = model("Group", groupSchema)