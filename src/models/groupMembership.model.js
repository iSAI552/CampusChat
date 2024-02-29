import { Schema, model } from "mongoose";

const groupMembershipSchema = new Schema({

}, { timestamps: true })

export const GroupMembership = model("GroupMembership", groupMembershipSchema)