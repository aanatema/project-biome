"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshTokenCookie = setRefreshTokenCookie;
exports.setAccessTokenCookie = setAccessTokenCookie;
const refreshTokenOptions = {
    httpOnly: true,
    secure: false, //false for dev, true for prod
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
function setRefreshTokenCookie(res, token) {
    res.cookie("refreshToken", token, refreshTokenOptions);
}
const accessTokenOptions = {
    httpOnly: true,
    secure: false, //false for dev, true for prod
    sameSite: "lax",
    maxAge: 1000 * 60 * 15, // 15 min
};
function setAccessTokenCookie(res, token) {
    res.cookie("accessToken", token, accessTokenOptions);
}
