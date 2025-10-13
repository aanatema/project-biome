import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
require("dotenv").config();

export interface User {
	id: string;
	email: string;
	username: string;
}

export function generateAccessToken(user: User) {
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	if (!accessTokenSecret) throw new Error("Access token secret undefined");
	return jwt.sign(user, accessTokenSecret, { expiresIn: "1m" });
}

export function generateRefreshToken(user: User) {
	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
	if (!refreshTokenSecret) throw new Error("Access token secret undefined");
	return jwt.sign(user, refreshTokenSecret, { expiresIn: "30d" });
}
