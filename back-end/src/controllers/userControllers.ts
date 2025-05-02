// what we send to create a new user
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  refreshTokenCookie,
  sanitizeUser,
  type ExpressRequest,
} from "../middleware/auth";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    // hash and add 10 salt rounds to the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const userWithoutPassword = sanitizeUser(newUser);
    const { accessToken, refreshToken } = generateTokens(userWithoutPassword);

    res.cookie("refreshToken", refreshToken, refreshTokenCookie);
    // second spread to flatten the object, no direct visual imbrication
    res.status(201).json({ ...userWithoutPassword, token: accessToken });
  } catch (error) {
    console.error("Something happened during the user's creation", error);
    res
      .status(500)
      .json({ error: "Something happened during the user's creation" });
  }
}

export async function loginUser(req: ExpressRequest, res: Response) {
  const { email, password } = req.body;

  try {
    // 1 email = 1 account
    const userLogin = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // make sure there is an email and a password matching in the db
    if (!userLogin || !userLogin.password) {
      return res.status(401).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, userLogin.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userWithoutPassword = sanitizeUser(userLogin);
    const { accessToken, refreshToken } = generateTokens(userWithoutPassword);

    res.cookie("refreshToken", refreshToken, refreshTokenCookie);
    res
      .status(200)
      .json({
        ...userWithoutPassword,
        token: accessToken,
      });
  } catch (error) {
    console.error("Something happened during the user connection", error);
    res
      .status(500)
      .json({ error: "Something happened during the user connection" });
  }
}

// TODO
export async function modifyUser(req: Request, res: Response) {
  const { username, email } = req.body;

  try {
    // Temporary stub
    res.status(200).json({ message: "modifyUser not implemented yet" });
  } catch (error) {
    console.error("Error in modifyUser", error);
    res
      .status(500)
      .json({ error: "Something happened during user modification" });
  }
}
