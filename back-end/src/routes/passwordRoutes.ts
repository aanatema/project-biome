import express from "express";

import {
	forgottenPassword,
	resetPassword,
} from "../controllers/passwordControllers";

const router = express.Router();

router.post("/forgotten_password", forgottenPassword);
router.post("/reset_password", resetPassword);
