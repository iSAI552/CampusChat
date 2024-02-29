import { Schema, model } from "mongoose";

const messageSchema = new Schema({

}, { timestamps: true })

export const Message = model("Message", messageSchema)