import otpGenerator from 'otp-generator';
import { Otp } from "../models/otp.models.js";
import { User } from "../models/user.models.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        let result = await Otp.findOne({otp});
        while(result){
            otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
            result = await Otp.findOne({otp});
        }
        const otpPayload = { email, otp };
        const otpBody = await Otp.create(otpPayload);
        res.status(201)
        .json( new ApiResponse(201, otpBody, "OTP sent successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }


}