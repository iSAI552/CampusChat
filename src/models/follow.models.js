import { Schema, model } from "mongoose";

const followSchema = new Schema({
    followerId: {               // The user who is doing the follow
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    followingId: {          // The user who is being followed
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const Follow = model("Follow", followSchema)