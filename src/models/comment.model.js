import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

console.log(baadshah())

const commentSchema = new Schema({

}, { timestamps: true })

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = model("Comment", commentSchema)

