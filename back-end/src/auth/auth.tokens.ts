import { sign } from "jsonwebtoken";
import type { JwtPayload } from "./auth.types";


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
if (!accessTokenSecret) throw new Error("Access token secret undefined");
export const generateAccessToken = (user: JwtPayload): string => {
	return sign({ id: user.id }, accessTokenSecret, { expiresIn: "15m" });
};

	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
	if (!refreshTokenSecret) throw new Error("Access token secret undefined");
export const generateRefreshToken = (user: JwtPayload): string => {
  return sign({ id: user.id }, refreshTokenSecret, { expiresIn: "7d" });
};
