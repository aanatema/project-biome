import type { Request, Response } from "express";
import { generateAccessToken } from "./auth.tokens";
import { verify } from "jsonwebtoken";
import prisma from "../lib/prisma";

export async function refreshAccessToken(req: Request, res: Response) {
  const refreshToken = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshToken)
    throw new Error("refresh token undefined in refreshAccessToken func");

  const token = req.cookies.refreshToken;
  if (!token) throw new Error("token in refreshAccessToken func undefined");

  try {
    const payload = verify(token, refreshToken) as { id: string };
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) throw new Error("user undefined in refreshAccessToken func");

    // remove password from user object
    const { password: _password, ...userWithoutPassword } = user;
    const newAccessToken = generateAccessToken(userWithoutPassword);
    return res.status(200).json({ token: newAccessToken });
  } catch (err) {
    console.error("Invalid refresh token", err);
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}
