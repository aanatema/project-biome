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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
exports.verifyToken = verifyToken;
exports.refreshAccessTooken = refreshAccessTooken;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const accessToken = process.env.ACCESS_TOKEN_SECRET;
if (!accessToken)
    throw new Error("access token undefined");
// generate a jwt based on the user email, can be extended later, see if needed
const generateAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ email: user.email }, accessToken, { expiresIn: "30m" });
};
exports.generateAccessToken = generateAccessToken;
const refreshToken = process.env.REFRESH_TOKEN_SECRET;
if (!refreshToken)
    throw new Error("refresh token undefined");
const generateRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ email: user.email }, refreshToken, { expiresIn: "15d" });
};
exports.generateRefreshToken = generateRefreshToken;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // extract authorization header from HTTP request
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ error: "No token provided" });
        // extract only the token from the header
        const token = authHeader.split(" ")[1];
        // check that the token exists
        const accessToken = process.env.ACCESS_TOKEN_SECRET;
        const refreshToken = process.env.REFRESH_TOKEN_SECRET;
        if (!accessToken)
            throw new Error("access token undefined");
        if (!refreshToken)
            throw new Error("refresh token undefined");
        try {
            // check if the signature has not been modified
            const decoded = (0, jsonwebtoken_1.verify)(token, accessToken);
            const user = yield prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            });
            // if user found, attached to user else undefined
            // useful for modify a user account
            req.user = user !== null && user !== void 0 ? user : undefined;
            next();
        }
        catch (err) {
            req.user = undefined;
            res.status(401).json({ error: "Invalid Token" });
        }
    });
}
function refreshAccessTooken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = process.env.REFRESH_TOKEN_SECRET;
        if (!refreshToken)
            throw new Error("refresh token undefined in refreshAccessToken func");
        const token = req.cookies.refreshToken;
        if (!token)
            throw new Error("token in refreshAccessToken func undefined");
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, refreshToken);
            const user = yield prisma.user.findUnique({
                where: {
                    email: payload.email,
                },
            });
            if (!user)
                throw new Error("user undefined in refreshAccessToken func");
            const { password: _password } = user, userWithoutPassword = __rest(user, ["password"]);
            const newAccessToken = (0, exports.generateAccessToken)(userWithoutPassword);
            return res.status(200).json({ token: newAccessToken });
        }
        catch (err) {
            console.error("Invalid refresh token", err);
            return res.status(401).json({ error: "Invalid or expired refresh token" });
        }
    });
}
