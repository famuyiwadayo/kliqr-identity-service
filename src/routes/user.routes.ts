import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();
const controller = new UserController();

router.post("/", controller.createUser);
router.post("/batch", controller.batchCreateUser);
router.get("/", controller.getUsers);

export default router;
