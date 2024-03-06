import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { zodSchema } from "../utils/ZodSchema.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const generateaccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
    
        return (accessToken, refreshToken)
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating the access and refresh tokens")
    }

}


const registerUser = asyncHandler( async (req, res) => {
    // *** handel the the rsakeys - to send the public key and using private key decrypt the user info 
   // handel the email otp

    const { email, password} = req.body
    let {username} = req.body

    if(!username){
        username = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(9, 15);
    }

    const userExisted = await User.findOne({ username })
    if(userExisted) throw new ApiError(409, "Username already taken please use a different one")

    try {
        zodSchema.parse({username, email, password})
    } catch (error) {
        return res.status(400)
        .json({
            error: "Validation failed", details: error.errors
        });
    }

    const logoLocalPath = req.files?.logo?.[0].path

    
    const logo = await uploadOnCloudinary(logoLocalPath) ?? "https://www.gravatar.com/avatar"

    const user = await User.create({
        username,
        email,
        password,
        college: "IITH",
        logo: logo
    })

    const createdUser = await User.findById(user._id).select(
        "-password -email -refreshToken -otp"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the User")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )





})

export { registerUser }
