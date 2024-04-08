import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, updateUserLogo, checkAuth } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(
    upload.single("logo"),
    registerUser
)

router.route("/login").post(loginUser)
router.route("/check-auth").get(checkAuth)

// secured routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/update-logo").patch(verifyJWT, upload.single("logo"), updateUserLogo)

export default router