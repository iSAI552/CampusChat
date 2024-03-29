import { Router } from "express";
import { getPostComments, addPostComment, updatePostComment, deletePostComment } from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.use(verifyJWT)

router.route("/:postId").get(getPostComments).post(addPostComment)
router.route("/:commentId").patch(updatePostComment).delete(deletePostComment)

export default router

