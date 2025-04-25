// what we send to create a new user

import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    res.status(201).json({ newUser });
  } catch (error) {
    console.error("Something happened during the user's creation", error);
    res
      .status(500)
      .json({ error: "Something happened during the user's creation" });
  }
}

// TODO
export async function loginUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const userLoginData = await prisma.user.findUnique({
      where: {
        username: username ? String(username) : "",
        email: email ? String(email) : "",
        password: password ? String(password) : "",
      },
    });
    res.status(200).json({ userLoginData });
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
    const userLoginData = await prisma.user.update;
  } catch (error) {}
}
