import { Button } from "@/components/shadcnComponents/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/shadcnComponents/card";
import { Input } from "@/components/shadcnComponents/input";
import { Label } from "@radix-ui/react-label";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { userApi } from "@/libraries/axios";
import { useAuth } from "@/Hooks/useAuth";

export type ModifyUserProps = {
	username?: string;
	email?: string; //Optional
	currentPassword: string;
	newPassword?: string; // Optional
};

export function ModifyUserForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ModifyUserProps>();
	const { user } = useAuth();
	const onModifySubmit: SubmitHandler<ModifyUserProps> = async (data) => {
		try {
			const updateData = {
				username: data.username,
				email: data.email,
				...(data.email && { email: data.email }),
				currentPassword: data.currentPassword,
				// include only if a new pswd is entered
				...(data.newPassword && { newPassword: data.newPassword }),
			};

			const response = await userApi.put("/modify_user", updateData);

			toast.success("Account updated successfully!");
			reset();
			console.log("User updated:", response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;

				if (status === 401) {
					toast.error("Incorrect current password");
				} else if (status === 409) {
					toast.error("Email already exists");
				} else if (status === 400) {
					toast.error("Invalid data provided");
				} else {
					toast.error(
						"Error while modifying your account, try again"
					);
				}

				console.error("Server error during user modification:", error);
			} else {
				toast.error("Network error occurred");
				console.error("Unexpected error:", error);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onModifySubmit)}>
			<Card className='mt-10 sm:w-90 md:w-140'>
				<CardHeader>
					<CardTitle>Modify your account</CardTitle>
					<Label className='m-2 text-center text-sm'>
						To confirm it's really you making the change, you'll
						need to enter your current password
					</Label>
				</CardHeader>
				<CardContent className='space-y-2'>
					<div className='space-y-1'>
						<div>
							<Label htmlFor='username'>
								Current username |{" "}
							</Label>
							<Label className='font-bold'>
								{user?.username}
							</Label>
						</div>

						<Input
							id='username'
							type='text'
							placeholder='Type your new username'
							{...register("username", {
								required: "Username cannot be empty",
								minLength: {
									value: 3,
									message:
										"Username must be at least 3 characters",
								},
							})}
						/>

						{errors.username && (
							<p className='text-red-500 text-sm'>
								{errors.username.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<div>
							<Label htmlFor='email'>Current email | </Label>
							<Label className='font-bold'>{user?.email}</Label>
						</div>

						<Input
							id='email'
							type='email'
							placeholder='exemple@email.com'
							{...register("email", {
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								},
							})}
						/>

						{errors.email && (
							<p className='text-red-500 text-sm'>
								{errors.email.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Label htmlFor='currentPassword'>
							Current password *
						</Label>
						<Input
							id='currentPassword'
							type='password'
							placeholder='********'
							{...register("currentPassword", {
								required:
									"Current password is required to confirm changes",
								minLength: {
									value: 8,
									message:
										"Your password should be at least 8 characters",
								},
							})}
						/>
						{errors.currentPassword && (
							<p className='text-red-500 text-sm'>
								{errors.currentPassword.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Label htmlFor='newPassword'>
							New password (optional)
						</Label>
						<Input
							id='newPassword'
							type='password'
							{...register("newPassword", {
								minLength: {
									value: 6,
									message:
										"New password must be at least 8 characters",
								},
							})}
							placeholder='Leave empty to keep your current password'
						/>
						{errors.newPassword && (
							<p className='text-red-500 text-sm'>
								{errors.newPassword.message}
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className='w-full'
						type='submit'>
						Update Account
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
