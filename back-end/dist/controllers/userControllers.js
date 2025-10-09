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
exports.forgottenPassword = forgottenPassword;
exports.resetPassword = resetPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_tokens_1 = require("../auth/auth.tokens");
const prisma_1 = __importDefault(require("../libraries/prisma"));
const auth_cookies_1 = require("../auth/auth.cookies");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailgun_service_1 = require("../services/mailgun.service");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            let newUser = yield prisma_1.default.user.findUnique({
                where: { email },
            });
            if (newUser)
                return res
                    .status(409)
                    .json({ error: "This email is already taken" });
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
            if (!user)
                return res.status(401).json({ error: "Unknown user" });
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                return res.status(401).json({ error: "Invalid credentials" });
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
function logoutUser(req, res) {
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
                return res.status(401).json({ error: "User not authenticated" });
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
                return res.status(404).json({ error: "User not found" });
            }
            const isCurrentPasswordValid = yield bcrypt_1.default.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                return res
                    .status(401)
                    .json({ error: "Incorrect current password" });
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
                    return res.status(409).json({ error: "Email already in use" });
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
                    // password exclu automatiquement
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
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user) {
                return res.status(401).json({
                    error: "Invalid token, the user appears to not be connected",
                });
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
function forgottenPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield prisma_1.default.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(200).json({
                    message: "A reset link has been sent.",
                });
            }
            const resetToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_RESET_SECRET, { expiresIn: "1h" });
            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
            yield (0, mailgun_service_1.sendResetPasswordEmail)(email, resetLink);
            return res.status(200).json({ message: "Reset email sent" });
        }
        catch (err) {
            console.error("Forgotten password error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ error: "Missing token or new password" });
        }
        if (newPassword.length < 8) {
            return res
                .status(400)
                .json({ error: "Password must be at least 8 characters" });
        }
        try {
            // verify and decode token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_RESET_SECRET);
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            yield prisma_1.default.user.update({
                where: { id: decoded.id },
                data: { password: hashedPassword },
            });
            res.status(200).json({ message: "Password updated successfully" });
        }
        catch (err) {
            console.error("Reset password error:", err);
            res.status(400).json({ error: "Invalid or expired token" });
        }
    });
}
