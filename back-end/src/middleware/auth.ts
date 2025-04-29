import { PrismaClient, type User } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";

const prisma = new PrismaClient();

// based on express request, adds an optional user to link to req.user later on
export interface ExpressRequest extends Request {
  user?: User;
}

interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

// ensure ACCESS_TOKEN_SECRET is defined to avoid runtime errors
const accessToken = process.env.ACCESS_TOKEN_SECRET;
if (!accessToken) throw new Error("access token undefined");
// generate a jwt based on the user email, can be extended later, see if needed
export const generateAccessToken = (user: JwtPayload): string => {
  return sign({ email: user.email }, accessToken, { expiresIn: "30m" });
};

const refreshToken = process.env.REFRESH_TOKEN_SECRET;
if (!refreshToken) throw new Error("refresh token undefined");

export const generateRefreshToken = (user: JwtPayload): string => {
  return sign({ email: user.email }, refreshToken, { expiresIn: "15d" });
};

export async function verifyToken(
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) {
  // extract authorization header from HTTP request
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  // extract only the token
  const token = authHeader.split(" ")[1];

  // check that the token exists
  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN_SECRET;
  if (!accessToken) throw new Error("access token undefined");
  if (!refreshToken) throw new Error("refresh token undefined");

  try {
    // check if the signature match the one sent, if it has not been modified
    const decoded = verify(token, accessToken) as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });
    // if user found, attached to user else undefined
    // usefull for modify a user account
    req.user = user ?? undefined;
    next();
  } catch (err) {
    req.user = undefined;
    res.status(401).json({ error: "Invalid Token" });
  }
}
