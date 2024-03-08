import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { userLoginZodSchema, userSignUpZodSchema } from "../utils/ZodSchema.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { remvoeTempFilesSync } from "../utils/removeTemp.js";

const options = {
    httpOnly: true,
    secure: true
}

const generateaccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
    
        return {accessToken, refreshToken}
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
    if(userExisted){
        remvoeTempFilesSync()
        throw new ApiError(409, "Username already taken please use a different one")
    }

    try {
        userSignUpZodSchema.parse({username, email, password})
    } catch (error) {
        removeTempFilesSync()
        return res.status(400)
        .json({
            error: "Validation failed", details: error.errors
        });
    }

    const logoLocalPath = req.file?.path
    
    const logo = await uploadOnCloudinary(logoLocalPath) ?? "https://www.gravatar.com/avatar"

    const user = await User.create({
        username,
        email,
        password,
        college: "IITH",
        logo: logo.url
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

const loginUser = asyncHandler( async (req, res) => {
    // send cookie

    const {username, password} = req.body
    try {
        userLoginZodSchema.parse({username, password})
    } catch (error) {
        throw new ApiError(400, "Incorrect format of username or password", error.errors)
    }

    const user = await User.findOne({username})
    if(!user){
        throw new ApiError(401, "User does not exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid credentials")
    }

    const {accessToken, refreshToken} = await generateaccessandRefreshToken(user?._id)

    const loggedInUser = await User.findById(user?._id)
    .select("-password -email -refreshToken")

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {loggedInUser, accessToken, refreshToken},
            "User loggedIn successfully"
        )
    )



})

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out Successfully"
        )
    )

})

export { registerUser, loginUser, logoutUser }
