import { Button, buttonVariants } from "@/components/shadcnComponents/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/shadcnComponents/dialog";
import { AuthContext } from "@/context/AuthContext";
import { authApi } from "@/libraries/axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { useContext } from "react";
import { toast } from "sonner";
import { Input } from "../shadcnComponents/input";
import { Label } from "@radix-ui/react-label";

export default function ForgottenPasswordDialog() {
	// const auth = useContext(AuthContext);

	// const sendEmail = async () => {
	// 	if (!auth) return;

	// 	try {
	// 		const refreshRes = await authApi.post("/refresh");
	// 		const accessToken = refreshRes.data.token;

	// 		const res = await fetch("http://localhost:3000/users/delete_user", {
	// 			method: "DELETE",
	// 			headers: {
	// 				Authorization: `Bearer ${accessToken}`,
	// 			},
	// 		});

	// 		if (!res.ok) throw new Error("Failed to delete account");
	// 		toast.success("Mail sent, check your inbox!");
	// 	} catch (err) {
	// 		console.error("Error while looking for account", err);
	// 		toast.error("We couldn't find your account, try again later or create one");
	// 	}
	// };
	return (
		<Dialog>
			<DialogTrigger asChild>
				<p className=' text-decoration-line: underline'>
					Forgot your password?
				</p>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Forgot your password?</DialogTitle>
					<DialogDescription className="mb-5">
						Enter your email and we'll check if you already have an
						account, if that's the case, we'll send you an email
						allowing you to reset your password.
					</DialogDescription>
				</DialogHeader>
				<Input placeholder='example@email.com' />
				<DialogFooter>
					<div className='grid w-full grid-cols-2 gap-4 mt-5'>
						<Button
							variant='default'
							type='submit'
							onClick={sendEmail}>
							Confirm
						</Button>
						<DialogClose
							className={buttonVariants({ variant: "destructive" })}>
							Cancel
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
