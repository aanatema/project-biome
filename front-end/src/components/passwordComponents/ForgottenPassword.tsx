import { useState, useContext } from "react";
import { Button, buttonVariants } from "../shadcnComponents/button";
import { AuthContext } from "@/context/AuthContext";
import { userApi } from "@/libraries/axios";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/shadcnComponents/dialog";
import { toast } from "sonner";
import { DialogHeader, DialogFooter } from "../shadcnComponents/dialog";
import { Input } from "../shadcnComponents/input";

export default function ForgottenPasswordDialog() {
	const auth = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(true);

	const sendEmail = async () => {
		if (!email) {
			toast.error("Please enter your email");
			return;
		}

		try {
			setLoading(true);
			await userApi.post("/forgotten_password", { email });
			toast.success("Mail sent, check your inbox!");
		} catch (err) {
			console.error("Error while sending reset email", err);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<p className='underline text-secondary cursor-pointer'>
					Forgot your password?
				</p>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Forgot your password?</DialogTitle>
					<DialogDescription>
						Enter your email. If you have an account, you'll receive
						an email to reset your password.
					</DialogDescription>
				</DialogHeader>

				<Input
					placeholder='example@email.com'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<DialogFooter>
					<div className='grid w-full grid-cols-2 gap-4 mt-5'>
						<Button
							variant='default'
							type='button'
							disabled={loading}
							onClick={sendEmail}>
							{loading ? "Sending..." : "Send"}
						</Button>
						<DialogClose
							disabled={loading}
							className={buttonVariants({
								variant: "destructive",
							})}>
							Cancel
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
