import { Router } from "express";
import { sendOtp } from "../controllers/otp.controllers.js";

const router = Router();

router.route("/").post(sendOtp);

export default router;