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
exports.deleteUser = deleteUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_tokens_1 = require("../auth/auth.tokens");
const prisma_1 = __importDefault(require("../libraries/prisma"));
const auth_cookies_1 = require("../auth/auth.cookies");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            let newUser = yield prisma_1.default.user.findUnique({
                where: { email },
            });
            if (newUser) {
                res.status(409).json({ error: "This email is already taken" });
                return;
            }
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
            res.status(201).json({
                user: userWithoutPassword,
                accessToken,
            });
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
            if (!user) {
                res.status(401).json({ error: "Unknown user" });
                return;
            }
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            console.log("Password valid:", validPassword);
            if (!validPassword) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const { password: _password } = user, userWithoutPassword = __rest(user, ["password"]);
            const accessToken = (0, auth_tokens_1.generateAccessToken)(userWithoutPassword);
            const refreshToken = (0, auth_tokens_1.generateRefreshToken)(userWithoutPassword);
            (0, auth_cookies_1.setRefreshTokenCookie)(res, refreshToken);
            res.status(200).json({ user: userWithoutPassword, accessToken });
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                error: "Something happened during the user connection",
            });
        }
    });
}
function logoutUser(res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "Successful logout" });
    });
}
function modifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { username, email, currentPassword, newPassword } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        try {
            if (!userId) {
                res.status(401).json({ error: "User not authenticated" });
                return;
            }
            // if (!username || !currentPassword) {
            // 	return res.status(400).json({
            // 		error: "Username and current password are required",
            // 	});
            // }
            const user = yield prisma_1.default.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            const isCurrentPasswordValid = yield bcrypt_1.default.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                res.status(401).json({ error: "Incorrect current password" });
                return;
            }
            // check if email is not already in use, apart from current user
            if (email !== user.email) {
                const existingUser = yield prisma_1.default.user.findFirst({
                    where: {
                        email: email,
                        NOT: { id: userId },
                    },
                });
                if (existingUser) {
                    res.status(409).json({ error: "Email already in use" });
                    return;
                }
            }
            const updateData = {
                username: username.trim(),
                email: email.toLowerCase().trim(),
            };
            if (newPassword && newPassword.trim() !== "") {
                const saltRounds = 10;
                updateData.password = yield bcrypt_1.default.hash(newPassword, saltRounds);
            }
            // update user in prisma
            const updatedUser = yield prisma_1.default.user.update({
                where: { id: userId },
                data: updateData,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    // password automatically excluded
                },
            });
            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            console.error("Error in modifyUser:", error);
            res.status(500).json({
                error: "Something happened during user modification",
            });
        }
    });
}
function getCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // user undefined = token invalid
            if (!req.user) {
                res.status(401).json({ error: "Invalid token" });
                return;
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
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user) {
                res.status(401).json({
                    error: "Invalid token, the user appears to not be connected",
                });
                return;
            }
            // delete reviews then user
            yield prisma_1.default.review.deleteMany({
                where: { authorId: req.user.id },
            });
            yield prisma_1.default.user.delete({
                where: { id: req.user.id },
            });
            // clean cookies
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: false, //until https
            });
            res.status(200).json({ message: "User account deleted" });
        }
        catch (err) {
            console.error("Error while deleting user:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
