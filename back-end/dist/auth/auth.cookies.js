"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookie = void 0;
exports.refreshTokenCookie = {
    httpOnly: true,
    secure: true, //HTTPS mandatory in prod
    sameSite: "strict", // anti CSRF
    maxAge: 15 * 24 * 60 * 60 * 1000, //15d in ms
};
