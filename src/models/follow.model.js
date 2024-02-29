import { Schema, model } from "mongoose";

const followSchema = new Schema({

}, { timestamps: true })

export const Follow = model("Follow", followSchema)