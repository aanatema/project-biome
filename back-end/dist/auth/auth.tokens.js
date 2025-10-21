"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
function generateAccessToken(user) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret)
        throw new Error("Access token secret undefined");
    return jsonwebtoken_1.default.sign(user, accessTokenSecret, { expiresIn: "1m" });
}
function generateRefreshToken(user) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret)
        throw new Error("Access token secret undefined");
    return jsonwebtoken_1.default.sign(user, refreshTokenSecret, { expiresIn: "30d" });
}
