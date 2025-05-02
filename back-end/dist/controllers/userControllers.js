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
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.modifyUser = modifyUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const prisma = new client_1.PrismaClient();
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            // hash and add 10 salt rounds to the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });
            // creates a new object user without the user password, deconstruction + exclusion
            const { password: _password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
            const accessToken = (0, auth_1.generateAccessToken)(userWithoutPassword);
            const refreshToken = (0, auth_1.generateRefreshToken)(userWithoutPassword);
            // refreshtoken send through httpOnly cookie 
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true, //HTTPS mandatory in prod
                sameSite: "strict", // anti CSRF
                maxAge: 15 * 24 * 60 * 60 * 1000, //15d in ms
            });
            // second spread to flatten the object, no direct visual imbrication
            res.status(201).json(Object.assign(Object.assign({}, userWithoutPassword), { token: accessToken }));
        }
        catch (error) {
            console.error("Something happened during the user's creation", error);
            res
                .status(500)
                .json({ error: "Something happened during the user's creation" });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // 1 email = 1 account
            const userLogin = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            // make sure there is an email and a password matching in the db
            if (!userLogin || !userLogin.password) {
                return res.status(401).json({ error: "User not found" });
            }
            const validPassword = yield bcrypt_1.default.compare(password, userLogin.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const { password: _password } = userLogin, userLoginWithoutPassword = __rest(userLogin, ["password"]);
            res
                .status(200)
                .json(Object.assign(Object.assign({}, userLoginWithoutPassword), { token: (0, auth_1.generateAccessToken)(userLogin) }));
        }
        catch (error) {
            console.error("Something happened during the user connection", error);
            res
                .status(500)
                .json({ error: "Something happened during the user connection" });
        }
    });
}
// TODO
function modifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email } = req.body;
        try {
            // Temporary stub
            res.status(200).json({ message: "modifyUser not implemented yet" });
        }
        catch (error) {
            console.error("Error in modifyUser", error);
            res
                .status(500)
                .json({ error: "Something happened during user modification" });
        }
    });
}
