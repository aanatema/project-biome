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
exports.forgottenPassword = forgottenPassword;
exports.resetPassword = resetPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../libraries/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailgun_service_1 = require("../services/mailgun.service");
function forgottenPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield prisma_1.default.user.findUnique({ where: { email } });
            if (!user) {
                res.status(200).json({
                    message: "A reset link has been sent.",
                });
                return;
            }
            const resetToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_RESET_SECRET, { expiresIn: "1h" });
            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
            yield (0, mailgun_service_1.sendResetPasswordEmail)(email, resetLink);
            res.status(200).json({ message: "Reset email sent" });
            return;
        }
        catch (err) {
            console.error("Forgotten password error:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
    });
}
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            res.status(400).json({ error: "Missing token or new password" });
            return;
        }
        if (newPassword.length < 8) {
            res.status(400).json({
                error: "Password must be at least 8 characters",
            });
            return;
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
