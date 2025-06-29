"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const auth_controllers_1 = require("../auth/auth.controllers");
const router = express_1.default.Router();
router.post("/login_user", userControllers_1.loginUser);
router.post("/refresh", auth_controllers_1.refreshAccessToken);
exports.default = router;
