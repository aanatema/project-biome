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
exports.sendResetPasswordEmail = sendResetPasswordEmail;
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const form_data_1 = __importDefault(require("form-data"));
const mailgun = new mailgun_js_1.default(form_data_1.default);
const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
});
function sendResetPasswordEmail(email, resetLink) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageData = {
            from: `No Reply <no-reply@${process.env.MAILGUN_DOMAIN}>`,
            to: email,
            subject: "Reset your password",
            text: `Hello!\n\nClick the link below to reset your password:\n\n${resetLink}\n\nIf you didn’t request this, ignore this message.`,
        };
        return mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);
    });
}
