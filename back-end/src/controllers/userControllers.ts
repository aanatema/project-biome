// what we send to create a new user
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../auth/auth.tokens";
import prisma from "../lib/prisma";
import type { User } from "@prisma/client";
import {
	setAccessTokenCookie,
	setRefreshTokenCookie,
} from "../auth/auth.cookies";

// here instead of in types bc error in loginUser email and pswd
// fix that later
export interface ExpressRequest extends Request {
	user?: User;
}

export async function createUser(req: Request, res: Response) {
	const { username, email, password } = req.body;

	try {
		//10 hash round
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		const { password: _password, ...userWithoutPassword } = user;

		const accessToken = generateAccessToken(userWithoutPassword);
		const refreshToken = generateRefreshToken(userWithoutPassword);

		setRefreshTokenCookie(res, refreshToken);
		res.status(201).json({ token: accessToken });
	} catch (error) {
		console.error("Error during user creation", error);
		res.status(500).json({
			error: "Error during user creation",
		});
	}
}

export async function loginUser(req: ExpressRequest, res: Response) {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { email: email },
		});
		if (!user) return res.status(401).json({ error: "Unknown user" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(401).json({ error: "Invalid credentials" });

		// remove password from user object, security measure
		const { password: _password, ...userWithoutPassword } = user;
		// accessToken will be used in the front-end to authenticate requests
		const accessToken = generateAccessToken(userWithoutPassword);
		const refreshToken = generateRefreshToken(userWithoutPassword);

		setRefreshTokenCookie(res, refreshToken);
		setAccessTokenCookie(res, accessToken);

		res.status(200).json({ userWithoutPassword });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			error: "Something happened during the user connection",
		});
	}
}

export async function logoutUser(req: ExpressRequest, res: Response) { 
	res.clearCookie("accessToken", {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",	
	});
	res.status(200).json({ message: "Successful logout" });
};

// TODO
export async function modifyUser(req: ExpressRequest, res: Response) {
	const { username, email, currentPassword, newPassword } = req.body;
	const userId = req.user?.id; // Assure-toi que l'utilisateur est authentifié
	try {
		// Vérifications de base
		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		if (!username || !currentPassword) {
			return res.status(400).json({
				error: "Username and current password are required",
			});
		}

		// Récupérer l'utilisateur actuel
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Vérifier le mot de passe actuel
		const isCurrentPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!isCurrentPasswordValid) {
			return res
				.status(401)
				.json({ error: "Incorrect current password" });
		}

		// Vérifier si l'email n'est pas déjà utilisé par un autre utilisateur
		if (email !== user.email) {
			const existingUser = await prisma.user.findFirst({
				where: {
					email: email,
					NOT: { id: userId }, // Exclure l'utilisateur actuel
				},
			});

			if (existingUser) {
				return res.status(409).json({ error: "Email already in use" });
			}
		}

		// Préparer les données de mise à jour
		const updateData: any = {
			username: username.trim(),
			email: email.toLowerCase().trim(),
		};

		// Si un nouveau mot de passe est fourni, le hasher
		if (newPassword && newPassword.trim() !== "") {
			const saltRounds = 10;
			updateData.password = await bcrypt.hash(newPassword, saltRounds);
		}

		// Mettre à jour l'utilisateur avec Prisma
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: updateData,
			select: {
				id: true,
				username: true,
				email: true,
				createdAt: true,
				// password exclu automatiquement
			},
		});

		res.status(200).json({
			message: "User updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error in modifyUser:", error);
		res.status(500).json({
			error: "Something happened during user modification",
		});
	}
}

export async function getCurrentUser(req: ExpressRequest, res: Response) {
	try {
		// if user is undefined, it means the token is invalid
		if (!req.user) {
			return res.status(401).json({ error: "Invalid token" });
		}
		const { password: _password, ...userWithoutPassword } = req.user;
		res.status(200).json(userWithoutPassword);
	} catch (error) {
		console.error("Error fetching current user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}
// delete user
