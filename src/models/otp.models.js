import { Schema, model } from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import bcrpt from "bcrypt";
import { Resend } from 'resend';

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
        if (!mailResponse) {
            throw new Error(mailResponse.error);
        }

        console.log("Email sent successfully");

        // const resend = new Resend(process.env.RESEND_API_KEY);
        // resend.emails.send({
        //     from: 'onboarding@resend.dev',
        //     to: email,
        //     subject: 'Verification Email',
        //     html: ` <h1>Please confirm your OTP for CampusChat</h1>
        //             <p>Here is your OTP code: ${otp}</p>`
        // });
        // console.log("Email sent successfully");

    } catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            await sendVerificationEMail(this.email, this.otp);
            this.otp = await bcrpt.hash(this.otp, 10);

        } catch (error) {
            next(error);
        }
    }
    next();
})

otpSchema.methods.compareOtp = async function (otp) {
    return await bcrpt.compare(otp, this.otp);
}

export const Otp = model("Otp", otpSchema);
