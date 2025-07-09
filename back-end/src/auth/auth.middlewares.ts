import { verify } from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import type { ExpressRequest } from "../controllers/userControllers";
import prisma from "../libraries/prisma";

export async function verifyToken(
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) {
  // extract authorization header from HTTP request
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.accessToken;

  // extract only the token from the header
  const token = authHeader?.split(" ")[1] || cookieToken;

  // check that the token exists
  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN_SECRET;
  if (!accessToken) throw new Error("access token undefined");
  if (!refreshToken) throw new Error("refresh token undefined");

  try {
    // check if the signature has not been modified
    const decoded = verify(token, accessToken) as { id: string };

    const user = await prisma.user.findUnique({
		where: {
			id: decoded.id,
		},
	});
    req.user = user ?? undefined;
    next();
    console.log("User verified:", req.user?.id);
  } catch (err) {
    req.user = undefined;
    res.status(401).json({ error: "Invalid Token" });
  }
}
