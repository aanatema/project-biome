import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../shadcnComponents/card";
import { Button } from "../shadcnComponents/button";
import { Input } from "../shadcnComponents/input";
import { toast } from "sonner";
import { userApi } from "@/libraries/axios";

export default function ResetPassword() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	// retrieve token from url
	const token = searchParams.get("token");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!password || password.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}

		if (!token) {
			toast.error("Invalid or missing token");
			return;
		}

		setLoading(true);

		try {
			await userApi.post("/reset_password", {
				token,
				newPassword: password,
			});
			toast.success("Your password has successfully been changed!");
		} catch (error) {
			toast.error("Something happened, please try again later");
			console.error(error);
		} finally {
			setLoading(false);
			navigate("/login-or-register");
		}
	};

	return (
		<div className='flex justify-center h-screen items-center gap-4 mt-6 mb-10'>
			<form onSubmit={handleSubmit}>
				<Card className='w-140'>
					<CardHeader>
						<CardTitle>Change password</CardTitle>
						<CardDescription>
							Enter your new password here, don't forget to make
							it secure!
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className='w-full'
							type='submit'
							disabled={loading}>
							{loading ? "Saving..." : "Confirm"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
