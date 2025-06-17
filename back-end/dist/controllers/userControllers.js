"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.modifyUser = modifyUser;
exports.getCurrentUser = getCurrentUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_tokens_1 = require("../auth/auth.tokens");
const auth_utils_1 = require("../auth/auth.utils");
const auth_cookies_1 = require("../auth/auth.cookies");
const prisma_1 = __importDefault(require("../lib/prisma"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            // hash and add 10 salt rounds to the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield prisma_1.default.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });
            const userWithoutPassword = (0, auth_utils_1.sanitizeUser)(newUser);
            const { accessToken, refreshToken } = (0, auth_tokens_1.generateTokens)(userWithoutPassword);
            res.cookie("refreshToken", refreshToken, auth_cookies_1.refreshTokenCookie);
            // second spread to flatten the object, no direct visual imbrication
            res.status(201).json(Object.assign(Object.assign({}, userWithoutPassword), { token: accessToken }));
        }
        catch (error) {
            console.error("Something happened during the user's creation", error);
            res
                .status(500)
                .json({ error: "Something happened during the user's creation" });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // 1 email = 1 account
            const userLogin = yield prisma_1.default.user.findUnique({
                where: {
                    email: email,
                },
            });
            // make sure there is an email and a password matching in the db
            if (!(userLogin === null || userLogin === void 0 ? void 0 : userLogin.email) || !userLogin.password) {
                return res.status(401).json({ error: "User not found" });
            }
            const validPassword = yield bcrypt_1.default.compare(password, userLogin.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const userWithoutPassword = (0, auth_utils_1.sanitizeUser)(userLogin);
            const { accessToken, refreshToken } = (0, auth_tokens_1.generateTokens)(userWithoutPassword);
            res.cookie("refreshToken", refreshToken, auth_cookies_1.refreshTokenCookie);
            res.cookie("token", accessToken, {
                httpOnly: true,
                secure: false, // secure should be true in production, false for local dev
                sameSite: "lax", // sameSite is set to lax to allow cross-site requests
                maxAge: 1000 * 60 * 15, // 15 min
            });
            res.status(200).json(Object.assign({}, userWithoutPassword));
        }
        catch (error) {
            console.error("Login error:", error);
            res
                .status(500)
                .json({ error: "Something happened during the user connection" });
        }
    });
}
// TODO
function modifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email } = req.body;
        try {
            // Temporary stub
            res.status(200).json({ message: "modifyUser not implemented yet" });
        }
        catch (error) {
            console.error("Error in modifyUser", error);
            res
                .status(500)
                .json({ error: "Something happened during user modification" });
        }
    });
}
function getCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // if user is undefined, it means the token is invalid
            if (!req.user) {
                return res.status(401).json({ error: "Invalid token" });
            }
            const userWithoutPassword = (0, auth_utils_1.sanitizeUser)(req.user);
            res.status(200).json(userWithoutPassword);
        }
        catch (error) {
            console.error("Error fetching current user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
// delete user
