import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    tags: [String],

}, { timestamps: true });

postSchema.plugin(mongooseAggregatePaginate)

export const Post = model("Post", postSchema)