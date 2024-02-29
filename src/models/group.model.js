import { Schema, model } from "mongoose";

const groupSchema = new Schema({

}, { timestamps: true })

export const Group = model("Group", groupSchema)