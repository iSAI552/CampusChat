import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    college: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },x
    logo: {
        type: String,
        default: "https://www.gravatar.com/avatar",

    },
    myPosts: [{
        type: Schema.Types.ObjectId,
        ref: "Post",
    }],
    myGroups: [{
        type: Schema.Types.ObjectId,
        ref: "Group",
    }],
    refreshToken: {
        type: String,
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otpExpires: {
        type: Date,
    },

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if(this.isNew){
        this.email = await bcrypt.hash(this.email, 10)
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
     {
         _id: this._id,
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
     }
    )
 }
 
export const User = model("User", userSchema)