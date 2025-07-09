import type { Response } from "express";

const refreshTokenOptions = {
	httpOnly: true,
	secure: false, //false for dev, true for prod
	sameSite: "lax" as const, // strict for prod
	maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
export function setRefreshTokenCookie(res: Response, token: string) {
	res.cookie("refreshToken", token, refreshTokenOptions);
}
