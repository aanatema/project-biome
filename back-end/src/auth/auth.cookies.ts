import type { CookieOptions } from "express";

export const  refreshTokenCookie : CookieOptions = {
  httpOnly: true,
  secure: true, //HTTPS mandatory in prod
  sameSite: "strict", // anti CSRF
  maxAge: 15 * 24 * 60 * 60 * 1000, //15d in ms
};
