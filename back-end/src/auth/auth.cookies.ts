import type { Response } from "express";

const refreshTokenOptions = {
	httpOnly: true,
	secure: true,
	sameSite: "strict" as const,
	maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

export function setRefreshTokenCookie(res: Response, token: string) {
	res.cookie("refreshToken", token, refreshTokenOptions);
}
