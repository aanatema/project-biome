import Mailgun from "mailgun.js";
import FormData from "form-data";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
	username: "api",
	key: process.env.MAILGUN_API_KEY as string,
});

export async function sendResetPasswordEmail(email: string, resetLink: string) {
	const messageData = {
		from: `No Reply <no-reply@${process.env.MAILGUN_DOMAIN}>`,
		to: email,
		subject: "Reset your password",
		text: `Hello!\n\nClick the link below to reset your password:\n\n${resetLink}\n\nIf you didn’t request this, ignore this message.`,
	};

	return mg.messages.create(
		process.env.MAILGUN_DOMAIN as string,
		messageData
	);
}
