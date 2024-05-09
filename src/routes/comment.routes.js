import { Router } from "express";
import { getPostComments, addPostComment, updateComment, deleteComment, getCommentReply, addCommentReply } from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.use(verifyJWT)

router.route("/:postId").get(getPostComments).post(addPostComment)
router.route("/:commentId").patch(updateComment).delete(deleteComment)
router.route("/reply/:commentId").get(getCommentReply).post(addCommentReply)

export default router

