"use strict";
// what we send to create a new user
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.modifyUser = modifyUser;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email } = req.body;
        try {
            const newUser = yield prisma.user.create({
                data: {
                    username,
                    email,
                },
            });
            res.status(201).json({ newUser });
        }
        catch (error) {
            console.error("Something happened during the user's creation", error);
            res
                .status(500)
                .json({ error: "Something happened during the user's creation" });
        }
    });
}
// TODO
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email } = req.body;
        try {
            const userLoginData = yield prisma.user.findUnique;
        }
        catch (error) {
        }
    });
}
// TODO
function modifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email } = req.body;
        try {
            const userLoginData = yield prisma.user.update;
        }
        catch (error) {
        }
    });
}
