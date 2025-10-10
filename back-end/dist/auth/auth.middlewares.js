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
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../libraries/prisma"));
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No access token provided" });
        }
        // check that the token exists
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        if (!accessTokenSecret)
            throw new Error("access token undefined");
        try {
            // check if the signature has not been modified
            const decoded = (0, jsonwebtoken_1.verify)(token, accessTokenSecret);
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    id: decoded.id,
                },
            });
            req.user = user !== null && user !== void 0 ? user : undefined;
            next();
            console.log("User verified:", (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        }
        catch (err) {
            req.user = undefined;
            res.status(401).json({ error: "Invalid Token" });
        }
    });
}
