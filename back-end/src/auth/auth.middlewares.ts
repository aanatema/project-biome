import { verify } from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import type { ExpressRequest } from "../controllers/userControllers";
import prisma from "../libraries/prisma";

export async function verifyToken(
	req: ExpressRequest,
	res: Response,
	next: NextFunction
): Promise<void> {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1];

	if (!token) {
		res.status(401).json({ error: "No access token provided" });
		return;
	}
	// check that the token exists
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	if (!accessTokenSecret) throw new Error("access token undefined");

	try {
		// check if the signature has not been modified
		const decoded = verify(token, accessTokenSecret) as { id: string };

		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});
		req.user = user ?? undefined;
		next();
	} catch (err) {
		req.user = undefined;
		res.status(401).json({ error: "Invalid Token" });
	}
}
