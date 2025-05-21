import { sign } from "jsonwebtoken";
import type { JwtPayload } from "./auth.types";

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
  return sign({ id: user.id }, accessToken, { expiresIn: "30m" });
};

const refreshToken = process.env.REFRESH_TOKEN_SECRET;
if (!refreshToken) throw new Error("refresh token undefined");
export const generateRefreshToken = (user: JwtPayload): string => {
  return sign({ id: user.id }, refreshToken, { expiresIn: "15d" });
};
