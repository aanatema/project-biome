// URL creating a new user
import express from "express";
import {
  createUser,
  getCurrentUser,
  loginUser,
  modifyUser,
} from "../controllers/userControllers";
import { verifyToken } from "../auth/auth.middlewares";

const router = express.Router();

router.post("/new_user", createUser);
router.post("/login_user", loginUser);
// authenticate the user with the token
router.get("/current_user", verifyToken, getCurrentUser);
router.post("/modify_user", verifyToken, modifyUser);

export default router;
