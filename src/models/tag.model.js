import { Schema, model } from "mongoose";

const tagSchema = new Schema({
    tagName: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Tag = model("Tag", tagSchema)