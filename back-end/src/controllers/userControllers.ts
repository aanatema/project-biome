// what we send to create a new user
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateAccessToken, type ExpressRequest } from "../middleware/auth";

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
    // creating a new object user without the user password, deconstruction + exclusion
    // security measure to avoid sending it to the client
    // the spread operator ...variable, allow us to copy an already existing object
    // without having to rewrite all elements we want by hand, we exclude pswd but still want the other infos
    const { password: _password, ...userWithoutPassword } = newUser;
    // second spread to flatten the object, no direct visual imbrication
    res
      .status(201)
      .json({ ...userWithoutPassword, token: generateAccessToken(userWithoutPassword) });
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
    // the email is unique, 1 email = 1 account
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

    const { password: _password, ...userLoginWithoutPassword } = userLogin;

    res
      .status(200)
      .json({ ...userLoginWithoutPassword, token: generateAccessToken(userLogin) });
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
    res.status(500).json({ error: "Something happened during user modification" });
  }
}
