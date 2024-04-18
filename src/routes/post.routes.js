import { Router } from "express";
import { createPost, getUserPosts, updatePost, deletePost, getAllPosts } from "../controllers/post.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createPost);
router.route("/user/:userId").get(getUserPosts);
router.route("/:postId").patch(updatePost).delete(deletePost);
router.route("/getAllPosts").get(getAllPosts);

export default router;