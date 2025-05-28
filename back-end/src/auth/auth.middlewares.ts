import { verify } from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import type { ExpressRequest } from "../controllers/userControllers";
import prisma from "../lib/prisma";

export async function verifyToken(
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) {
  // extract authorization header from HTTP request
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });
  // extract only the token from the header
  const token = authHeader.split(" ")[1];

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
    // if user found, attached to user else undefined
    // useful for modify a user account
    req.user = user ?? undefined;
    next();
  } catch (err) {
    req.user = undefined;
    res.status(401).json({ error: "Invalid Token" });
  }
}
