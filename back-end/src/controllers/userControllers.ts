// what we send to create a new user
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../auth/auth.tokens";
import prisma from "../libraries/prisma";
import type { User } from "@prisma/client";
import {
	setAccessTokenCookie,
	setRefreshTokenCookie,
} from "../auth/auth.cookies";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../services/mailgun.service";

export interface ExpressRequest extends Request {
	user?: User;
}

export async function createUser(req: Request, res: Response) {
	const { username, email, password } = req.body;

	try {
		let newUser = await prisma.user.findUnique({
			where: { email },
		});
		if (newUser)
			return res
				.status(409)
				.json({ error: "This email is already taken" });

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

		setAccessTokenCookie(res, accessToken);
		setRefreshTokenCookie(res, refreshToken);

		res.status(201).json({ userWithoutPassword });
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

		const { password: _password, ...userWithoutPassword } = user;
		const accessToken = generateAccessToken(userWithoutPassword);
		const refreshToken = generateRefreshToken(userWithoutPassword);

		setRefreshTokenCookie(res, refreshToken);
		setAccessTokenCookie(res, accessToken);
		res.status(200).json({ user: userWithoutPassword });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			error: "Something happened during the user connection",
		});
	}
}

export async function logoutUser(req: ExpressRequest, res: Response) {
	res.clearCookie("refreshToken", {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
	res.clearCookie("accessToken", {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
	res.status(200).json({ message: "Successful logout" });
}

export async function modifyUser(req: ExpressRequest, res: Response) {
	const { username, email, currentPassword, newPassword } = req.body;
	const userId = req.user?.id;
	try {
		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		// if (!username || !currentPassword) {
		// 	return res.status(400).json({
		// 		error: "Username and current password are required",
		// 	});
		// }

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const isCurrentPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!isCurrentPasswordValid) {
			return res
				.status(401)
				.json({ error: "Incorrect current password" });
		}

		// check if email is not already in use, apart from current user
		if (email !== user.email) {
			const existingUser = await prisma.user.findFirst({
				where: {
					email: email,
					NOT: { id: userId },
				},
			});
			if (existingUser) {
				return res.status(409).json({ error: "Email already in use" });
			}
		}

		const updateData: any = {
			username: username.trim(),
			email: email.toLowerCase().trim(),
		};

		if (newPassword && newPassword.trim() !== "") {
			const saltRounds = 10;
			updateData.password = await bcrypt.hash(newPassword, saltRounds);
		}

		// update user in prisma
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

export async function deleteUser(req: ExpressRequest, res: Response) {
	try {
		if (!req.user) {
			return res.status(401).json({
				error: "Invalid token, the user appears to not be connected",
			});
		}

		// delete reviews then user
		await prisma.review.deleteMany({
			where: { authorId: req.user.id },
		});
		await prisma.user.delete({
			where: { id: req.user.id },
		});

		// clean cookies
		res.clearCookie("refreshToken", {
			httpOnly: true,
			sameSite: "strict",
			secure: false, //until https
		});

		res.status(200).json({ message: "User account deleted" });
	} catch (err) {
		console.error("Error while deleting user:", err);
		res.status(500).json({ error: "Internal server error" });
	}
}

export async function forgottenPassword(req: ExpressRequest, res: Response) {
	const { email } = req.body;

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(200).json({
				message: "A reset link has been sent.",
			});
		}

		const resetToken = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_RESET_SECRET as string,
			{ expiresIn: "1h" }
		);

		const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
		await sendResetPasswordEmail(email, resetLink);
		return res.status(200).json({ message: "Reset email sent" });
	} catch (err) {
		console.error("Forgotten password error:", err);
		return res.status(500).json({ error: "Internal server error" });
	}
}

export async function resetPassword(req: ExpressRequest, res: Response) {
	const { token, newPassword } = req.body;

	if (!token || !newPassword) {
		return res.status(400).json({ error: "Missing token or new password" });
	}

	if (newPassword.length < 8) {
		return res
			.status(400)
			.json({ error: "Password must be at least 8 characters" });
	}

	try {
		// verify and decode token
		const decoded = jwt.verify(
			token,
			process.env.JWT_RESET_SECRET as string
		) as {
			id: string;
		};

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await prisma.user.update({
			where: { id: decoded.id },
			data: { password: hashedPassword },
		});

		res.status(200).json({ message: "Password updated successfully" });
	} catch (err) {
		console.error("Reset password error:", err);
		res.status(400).json({ error: "Invalid or expired token" });
	}
}