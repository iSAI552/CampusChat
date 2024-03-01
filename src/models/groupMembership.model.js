import { Schema, model } from "mongoose";

const groupMembershipSchema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["Member", "Moderator", "Admin"],
        default: "Member"
    }

}, { timestamps: true })

export const GroupMembership = model("GroupMembership", groupMembershipSchema)