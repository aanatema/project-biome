import { Button } from "@/components/shadcnComponents/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/shadcnComponents/card";
import { Input } from "@/components/shadcnComponents/input";
import ForgottenPasswordDialog from "@/components/passwordComponents/ForgottenPassword";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@radix-ui/react-label";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type UserProps = {
	username: string;
	email: string;
	password: string;
};

export default function LoginForm() {
	const { login } = useAuth(); // call Auth context
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserProps>();

	const onLoginSubmit: SubmitHandler<UserProps> = async (data) => {
		try {
			const success = await login(data.email, data.password);

			if (!success) {
				toast.error("Login failed, please check your credentials", {
					duration: 4000,
				});
				return;
			} else {
				navigate("/homepage", { replace: true });
				reset();
				toast.success("Logged in!");
			}
		} catch (error) {
			console.error("Login error:", error);
			toast.error(
				"An unexpected error occurred during login, try again later",
				{
					duration: 4000,
				}
			);
		}
	};

	return (
		<form onSubmit={handleSubmit(onLoginSubmit)}>
			<Card className='w-90 md:w-140'>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Log into your account</CardDescription>
				</CardHeader>
				<CardContent className='space-y-2'>
					<div className='space-y-1'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							{...register("email", {
								required: "Incorrect email",
							})}
						/>
						{errors.email && <p>{errors.email.message}</p>}
					</div>
					<div className='space-y-1'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							{...register("password", {
								required: "Incorrect password",
								minLength: {
									value: 8,
									message:
										"Password must be at least 8 characters",
								},
							})}
						/>
						{errors.password && <p>{errors.password.message}</p>}
					</div>
					<ForgottenPasswordDialog />
				</CardContent>
				<CardFooter>
					<Button
						className='w-full'
						type='submit'>
						Connect
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
