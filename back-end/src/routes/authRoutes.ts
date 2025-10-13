import express from "express"
import { loginUser } from "../controllers/userControllers";
import { refreshAccessToken } from "../controllers/authControllers";

const router = express.Router();

router.post("/login_user", loginUser);
router.post("/refresh", refreshAccessToken);

export default router;
