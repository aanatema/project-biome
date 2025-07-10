import type { Request, Response } from "express";
import { generateAccessToken } from "./auth.tokens";
import { verify } from "jsonwebtoken";
import prisma from "../lib/prisma";

export async function refreshAccessToken(req: Request, res: Response) {
	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
	if (!refreshTokenSecret) throw new Error("refresh token secret undefined");

	const token = req.cookies.refreshToken;
	if (!token) {
		return res.status(401).json({ error: "No refresh token provided" });
	}

	try {
		const payload = verify(token, refreshTokenSecret) as { id: string };
		const user = await prisma.user.findUnique({
			where: { id: payload.id },
		});
		if (!user) throw new Error("user not found");

		const { password: _password, ...userWithoutPassword } = user;
		const newAccessToken = generateAccessToken(userWithoutPassword);

		return res.status(200).json({
			accessToken: newAccessToken,
			user: userWithoutPassword,
		});
	} catch (err) {
		return res
			.status(401)
			.json({ error: "Invalid or expired refresh token" });
	}
}
