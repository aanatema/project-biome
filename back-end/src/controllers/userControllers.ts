// what we send to create a new user

import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

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
  const { email, password } = req.body;

  try {
    // the email is unique, 1 email = 1 account
    const userLoginData = await prisma.user.findUnique({
      where: {
        email: email ? String(email) : "",
      },
    });

    // make sure there is a password
    if (!userLoginData || !userLoginData.password) {
      return res
        .status(401)
        .json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      password,
      userLoginData.password
    );

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

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
