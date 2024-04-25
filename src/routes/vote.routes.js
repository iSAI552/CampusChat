import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { voteComment, votePost, getUpvotedPosts, getDownVotedPosts } from "../controllers/vote.controllers.js";

const router = Router()

router.use(verifyJWT)

router.route("/post/:postId/:voteType").post(votePost)
router.route("/comment/:commentId/:voteType").post(voteComment)
router.route("/upvoted-posts").get(getUpvotedPosts)
router.route("/downvoted-posts").get(getDownVotedPosts)

export default router