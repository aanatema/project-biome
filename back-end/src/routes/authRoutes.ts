import express from "express"
import { refreshAccessToken } from "../auth/auth.controllers";
const router = express.Router(); 

router.post("/refresh", refreshAccessToken);
