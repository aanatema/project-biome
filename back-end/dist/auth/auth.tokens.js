"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
if (!accessTokenSecret)
    throw new Error("Access token secret undefined");
const generateAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ id: user.id }, accessTokenSecret, { expiresIn: "15m" });
};
exports.generateAccessToken = generateAccessToken;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
if (!refreshTokenSecret)
    throw new Error("Access token secret undefined");
const generateRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ id: user.id }, refreshTokenSecret, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
