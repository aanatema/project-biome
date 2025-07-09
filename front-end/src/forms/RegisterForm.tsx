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
import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/libraries/axios";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type UserProps = {
	username: string;
	email: string;
	password: string;
};

export function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserProps>();

	const navigate = useNavigate();
	const { login } = useAuth();

	const onRegisterSubmit: SubmitHandler<UserProps> = async (data) => {
		const newUserData = {
			username: data.username,
			email: data.email,
			password: data.password,
		};

		try {
			await userApi.post("/new_user", newUserData);
			await login(data.email, data.password);
			navigate("/homepage", { replace: true });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;

				if (status === 400) {
					toast.error("Invalid user data");
				} else if (status === 409) {
					toast.error("This email is taken. You may have an account");
				} else {
					toast.error(
						"Error while registering, verify your credentials"
					);
				}
			} else {
				toast.error("Network error occurred");
			}
			reset();
		}
	};

	return (
		<form onSubmit={handleSubmit(onRegisterSubmit)}>
			<Card className='w-140'>
				<CardHeader>
					<CardTitle>Register</CardTitle>
					<CardDescription>
						No account yet ? Create yours here
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-2'>
					<div className='space-y-1'>
						<Label htmlFor='username'>Username</Label>
						<Input
							id='username'
							type='text'
							{...register("username", {
								required: "Incorrect username",
							})}
						/>
						{errors.username && <p>{errors.username.message}</p>}
					</div>
					<div className='space-y-1'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
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
				</CardContent>
				<CardFooter>
					<Button
						className='w-full'
						type='submit'>
						Register
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
