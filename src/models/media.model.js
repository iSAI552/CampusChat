import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const mediaSchema = new Schema({

}, {timestamps: true})

mediaSchema.plugin(mongooseAggregatePaginate)

export const Media = model("Media", mediaSchema)