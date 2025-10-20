import type { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../auth/auth.tokens";
import { verify } from "jsonwebtoken";
import prisma from "../libraries/prisma";

export async function refreshAccessToken(req: Request, res: Response): Promise<void> {
	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
	if (!refreshTokenSecret) throw new Error("refresh token secret undefined");

	const token = req.cookies.refreshToken;
	if (!token) {
		res.status(401).json({ error: "No refresh token provided" });
		return;
	}

	try {
		const payload = verify(token, refreshTokenSecret) as { id: string };
		const user = await prisma.user.findUnique({
			where: { id: payload.id },
		});
		if (!user) throw new Error("user not found");

		const { password: _password, ...userWithoutPassword } = user;
		const newAccessToken = generateAccessToken(userWithoutPassword);

		res.status(200).json({
			accessToken: newAccessToken,
			user: userWithoutPassword,
		});
		return;
	} catch (err) {
		res.status(401).json({ error: "Invalid or expired refresh token" });
		return;
	}
}
