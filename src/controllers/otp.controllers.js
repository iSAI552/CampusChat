import { Otp } from "../models/otp.models.js";
import { emailZodSchema } from "../utils/ZodSchema.js";
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js'

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        try {
            emailZodSchema.parse({ email });
        } catch (error) {
            return res.status(400).json(new ApiResponse(400, null, error.errors));
        }
        let otp = generateOTP();
        let result = await Otp.findOne({otp});
        while(result){
            otp = generateOTP();
            result = await Otp.findOne({otp});
        }
        const otpPayload = { email, otp };
        const otpBody = await Otp.create(otpPayload);
        if(!otpBody){
            throw new ApiError(500, "Error creating OTP")
        }
        res.status(201)
        .json( new ApiResponse(201, otp, "OTP sent successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }


}

function generateOTP() {
    const length = 6;
    const digits = '0123456789';
    let OTP = '';

    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
}