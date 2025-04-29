// what we send to create a new user

import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient, type User } from "@prisma/client";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();
const generateJwt = (user: User): string => {
  // storing email as an object so we can add more fields later on 
  return sign({ email: user.email }, "REFRESH_TOKEN");
};

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
    // creating a new object user without the user password
    // security measure to avoid sending it to the client
    const {password: _password, ...userWithoutPassword} = newUser

    res.status(201).json({ userWithoutPassword });
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
      return res.status(401).json({ error: "User not found" });
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
