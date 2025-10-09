"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshTokenCookie = setRefreshTokenCookie;
const refreshTokenOptions = {
    httpOnly: true,
    secure: false, //false for dev, true for prod
    sameSite: "lax", // strict for prod
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
function setRefreshTokenCookie(res, token) {
    res.cookie("refreshToken", token, refreshTokenOptions);
}
