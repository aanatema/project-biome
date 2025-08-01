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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.modifyUser = modifyUser;
exports.getCurrentUser = getCurrentUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_tokens_1 = require("../auth/auth.tokens");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_cookies_1 = require("../auth/auth.cookies");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            //10 hash round
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield prisma_1.default.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });
            const { password: _password } = user, userWithoutPassword = __rest(user, ["password"]);
            const accessToken = (0, auth_tokens_1.generateAccessToken)(userWithoutPassword);
            const refreshToken = (0, auth_tokens_1.generateRefreshToken)(userWithoutPassword);
            (0, auth_cookies_1.setRefreshTokenCookie)(res, refreshToken);
            res.status(201).json({ token: accessToken });
        }
        catch (error) {
            console.error("Error during user creation", error);
            res.status(500).json({
                error: "Error during user creation",
            });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield prisma_1.default.user.findUnique({
                where: { email: email },
            });
            if (!user)
                return res.status(401).json({ error: "Unknown user" });
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                return res.status(401).json({ error: "Invalid credentials" });
            // remove password from user object, security measure
            const { password: _password } = user, userWithoutPassword = __rest(user, ["password"]);
            // accessToken will be used in the front-end to authenticate requests
            const accessToken = (0, auth_tokens_1.generateAccessToken)(userWithoutPassword);
            const refreshToken = (0, auth_tokens_1.generateRefreshToken)(userWithoutPassword);
            (0, auth_cookies_1.setRefreshTokenCookie)(res, refreshToken);
            (0, auth_cookies_1.setAccessTokenCookie)(res, accessToken);
            res.status(200).json({ userWithoutPassword });
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                error: "Something happened during the user connection",
            });
        }
    });
}
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "Successful logout" });
    });
}
;
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
            res.status(500).json({
                error: "Something happened during user modification",
            });
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
            const _a = req.user, { password: _password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            res.status(200).json(userWithoutPassword);
        }
        catch (error) {
            console.error("Error fetching current user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
// delete user
