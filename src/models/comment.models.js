import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
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
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }

}, { timestamps: true })

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = model("Comment", commentSchema)

