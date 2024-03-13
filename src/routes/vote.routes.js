import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { voteComment, votePost, getUpvotedPosts } from "../controllers/vote.controllers.js";

const router = Router()

router.use(verifyJWT)

router.route("/vote/post/:postId/:voteType").post(votePost)
router.route("/vote/comment/:commentId/:voteType").post(voteComment)
router.route("/upvoted-posts").get(getUpvotedPosts)

export default router