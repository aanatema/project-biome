import type { NextFunction, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../libraries/prisma";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../services/mailgun.service";
import { ExpressRequest } from "./userControllers";

export async function forgottenPassword(
	req: ExpressRequest,
	res: Response
): Promise<void> {
	const { email } = req.body;

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			res.status(200).json({
				message: "A reset link has been sent.",
			});
			return;
		}

		const resetToken = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_RESET_SECRET as string,
			{ expiresIn: "1h" }
		);

		const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
		await sendResetPasswordEmail(email, resetLink);
		res.status(200).json({ message: "Reset email sent" });
		return;
	} catch (err) {
		console.error("Forgotten password error:", err);
		res.status(500).json({ error: "Internal server error" });
		return;
	}
}

export async function resetPassword(
	req: ExpressRequest,
	res: Response
): Promise<void> {
	const { token, newPassword } = req.body;

	if (!token || !newPassword) {
		res.status(400).json({ error: "Missing token or new password" });
		return;
	}

	if (newPassword.length < 8) {
		res.status(400).json({
			error: "Password must be at least 8 characters",
		});
		return;
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
