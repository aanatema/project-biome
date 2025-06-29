"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// URL creating a new user
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const auth_middlewares_1 = require("../auth/auth.middlewares");
const router = express_1.default.Router();
router.post("/new_user", userControllers_1.createUser);
router.post("/login_user", userControllers_1.loginUser);
router.post("/logout_user", userControllers_1.logoutUser);
// authenticate the user with the token
router.get("/current_user", auth_middlewares_1.verifyToken, userControllers_1.getCurrentUser);
router.post("/modify_user", auth_middlewares_1.verifyToken, userControllers_1.modifyUser);
exports.default = router;
