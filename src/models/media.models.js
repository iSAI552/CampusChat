import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const mediaSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    fileURI: {
        type: String, // Cloudinary link
        required: true,
    },
    uploadedByUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true})

mediaSchema.plugin(mongooseAggregatePaginate)

export const Media = model("Media", mediaSchema)