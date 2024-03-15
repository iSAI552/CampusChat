import { Router } from "express";
import { createGroup, deleteGroup, getGroupPosts } from "../controllers/group.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createGroup);
router.route("/:groupId").delete(deleteGroup).get(getGroupPosts);


export default router;