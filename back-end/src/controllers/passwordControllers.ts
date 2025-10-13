import type { Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../libraries/prisma";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../services/mailgun.service";
import { ExpressRequest } from "./userControllers";

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
