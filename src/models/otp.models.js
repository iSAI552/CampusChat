import { Schema, model } from "mongoose";
import { mailSender } from "../utils/mailSender.js";

const otpSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 5,
        },
    },
);

async function sendVerificationEMail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );

        console.log("Email sent successfully" ,mailResponse);

    } catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            await sendVerificationEMail(this.email, this.otp);
        } catch (error) {
            next(error);
        }
    }
    next();
})

export const Otp = model("Otp", otpSchema);
