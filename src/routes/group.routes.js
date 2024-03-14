import { Router } from "express";
import { createGroup, deleteGroup } from "../controllers/group.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createGroup);
router.route("/:groupId").delete(deleteGroup);

export default router;