import { Schema, model } from "mongoose";

const voteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    voteType: {
        type: String,
        enum: ['upvote', 'downvote'],
        required: true
    },
    
}, { timestamps: true })

export const Vote = model("Vote", voteSchema)