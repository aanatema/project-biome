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
exports.refreshAccessToken = refreshAccessToken;
const auth_tokens_1 = require("./auth.tokens");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../lib/prisma"));
function refreshAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = process.env.REFRESH_TOKEN_SECRET;
        if (!refreshToken)
            throw new Error("refresh token undefined in refreshAccessToken func");
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ error: "No refresh token provided" });
        }
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, refreshToken);
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    id: payload.id,
                },
            });
            if (!user)
                throw new Error("user undefined in refreshAccessToken func");
            // remove password from user object
            const { password: _password } = user, userWithoutPassword = __rest(user, ["password"]);
            const newAccessToken = (0, auth_tokens_1.generateAccessToken)(userWithoutPassword);
            return res.status(200).json({ token: newAccessToken });
        }
        catch (err) {
            console.error("Invalid refresh token", err);
            return res
                .status(401)
                .json({ error: "Invalid or expired refresh token" });
        }
    });
}
