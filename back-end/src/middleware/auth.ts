import { PrismaClient, type User } from "@prisma/client";
import type { Request, Response, NextFunction, CookieOptions } from "express";
import { sign, verify } from "jsonwebtoken";

const prisma = new PrismaClient();

// based on express request, adds an optional user to link to req.user later on
export interface ExpressRequest extends Request {
  user?: User;
}

// creates a new object user without the user password, deconstruction + exclusion
export function sanitizeUser(user: User){
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export const  refreshTokenCookie : CookieOptions = {
  httpOnly: true,
  secure: true, //HTTPS mandatory in prod
  sameSite: "strict", // anti CSRF
  maxAge: 15 * 24 * 60 * 60 * 1000, //15d in ms
};
interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

export function generateTokens(user: JwtPayload) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}

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
  // extract only the token from the header
  const token = authHeader.split(" ")[1];

  // check that the token exists
  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN_SECRET;
  if (!accessToken) throw new Error("access token undefined");
  if (!refreshToken) throw new Error("refresh token undefined");

  try {
    // check if the signature has not been modified
    const decoded = verify(token, accessToken) as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
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

export async function refreshAccessTooken(req: Request, res: Response) {
  const refreshToken = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshToken)
    throw new Error("refresh token undefined in refreshAccessToken func");

  const token = req.cookies.refreshToken;
  if (!token) throw new Error("token in refreshAccessToken func undefined");

  try {
    const payload = verify(token, refreshToken) as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) throw new Error("user undefined in refreshAccessToken func");

    const { password: _password, ...userWithoutPassword } = user;
    const newAccessToken = generateAccessToken(userWithoutPassword);
    return res.status(200).json({ token: newAccessToken });
  } catch (err) {
    console.error("Invalid refresh token", err);
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}
