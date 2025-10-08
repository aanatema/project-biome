import { Button } from "@/components/shadcnComponents/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcnComponents/card";
import { Input } from "@/components/shadcnComponents/input";
import { ConfirmDeletionDialog } from "@/components/userComponents/ConfirmDeletion";
import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/libraries/axios";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

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
		watch,
	} = useForm<ModifyUserProps>();
	const { user } = useAuth();

	const watchNewPassword = watch("newPassword");

	const onModifySubmit: SubmitHandler<ModifyUserProps> = async (data) => {
		try {
			const updateData = {
				username: data.username,
				currentPassword: data.currentPassword,
				...(data.email && { email: data.email }),
				...(data.newPassword && { newPassword: data.newPassword }),
			};

			await userApi.put("/modify_user", updateData);

			toast.success("Account updated successfully!");
			reset();
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
			<Card className='my-10 sm:w-90 md:w-140'>
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
							Current password{" "}
							{watchNewPassword &&
								"* (required to change password)"}
						</Label>
						<Input
							id='currentPassword'
							type='password'
							placeholder='********'
							{...register("currentPassword", {
								validate: (value) => {
									if (watchNewPassword && value.length < 8) {
										return "Current password must be at least 8 characters";
									}
									if (watchNewPassword && !value) {
										return "Current password is required when changing password";
									}
									return true;
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
						<Label htmlFor='newPassword'>New password</Label>
						<Input
							id='newPassword'
							type='password'
							{...register("newPassword", {
								minLength: {
									value: 8,
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
					<div className='grid w-full grid-cols-2 gap-4'>
						<Button type='submit'>Update Account</Button>
						<ConfirmDeletionDialog />
					</div>
				</CardFooter>
			</Card>
		</form>
	);
}
