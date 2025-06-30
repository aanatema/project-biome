"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const accessToken = process.env.ACCESS_TOKEN_SECRET;
if (!accessToken)
    throw new Error("access token undefined");
// generate a jwt based on the user id, can be extended later, see if needed
const generateAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ id: user.id }, accessToken, { expiresIn: "30m" });
};
exports.generateAccessToken = generateAccessToken;
const refreshToken = process.env.REFRESH_TOKEN_SECRET;
if (!refreshToken)
    throw new Error("refresh token undefined");
const generateRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ id: user.id }, refreshToken, { expiresIn: "15d" });
};
exports.generateRefreshToken = generateRefreshToken;
