"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// URL creating a new user
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
router.post("/new_user", userControllers_1.createUser);
// LOGIC TO BE DONE IN THE CONTROLLER FILE
router.post("/login_user", userControllers_1.loginUser);
router.post("/modify_user", userControllers_1.modifyUser);
exports.default = router;
