import express from "express";
import {
	createUser,
	deleteUser,
	getCurrentUser,
	loginUser,
	logoutUser,
	modifyUser,
} from "../controllers/userControllers";
import { verifyToken } from "../auth/auth.middlewares";

const router = express.Router();

router.post("/new_user", createUser);
router.post("/login_user", loginUser);
router.post("/logout_user", logoutUser);


router.put("/modify_user", verifyToken, modifyUser);

router.get("/current_user", verifyToken, getCurrentUser);

router.delete("/delete_user", verifyToken, deleteUser);
export default router;
