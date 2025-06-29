import type { Response } from "express";

const refreshTokenOptions = {
	httpOnly: true,
	secure: false, //false for dev, true for prod
	sameSite: "lax" as const,
	maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

export function setRefreshTokenCookie(res: Response, token: string) {
	res.cookie("refreshToken", token, refreshTokenOptions);
}

const accessTokenOptions = {
	httpOnly: true,
	secure: false, //false for dev, true for prod
	sameSite: "lax" as const,
	maxAge: 1000 * 60 * 15, // 15 min
};

export function setAccessTokenCookie(res: Response, token: string) {
	res.cookie("accessToken", token, accessTokenOptions);
}