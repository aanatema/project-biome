import { ConfirmDeletionDialog } from "@/components/userComponents/ConfirmDeletion";
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

export type UserProps = {
  username: string;
  email: string;
  password?: string;
};

export function ModifyUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProps>();

  const onModifySubmit: SubmitHandler<UserProps> = async (data) => {
    const newUserData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = await fetch("http://localhost:3000/users/new_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!response.ok){
      toast.error("Error while modifying your account, try again"); 
      reset();
      return console.error()
    }

    const json = await response.json();
    reset();
    console.log(json);
  };

  return (
		<form onSubmit={handleSubmit(onModifySubmit)}>
			<Card className='mt-10 sm:w-90 md:w-140'>
				<CardHeader>
					<CardTitle>Modify your account</CardTitle>
				</CardHeader>
				<CardContent className='space-y-2'>
					<div className='space-y-1'>
						<Label htmlFor='username'>Username</Label>
						<Input
							id='username'
							type='text'
							{...register("username", {
								required: "You can not have an empty username",
							})}
						/>
						{errors.username && <p>{errors.username.message}</p>}
					</div>

					{/* TODO ALLOW IMPORTANT CHANGE ONLY IF THE PASSWORD HAS BEEN VERIFIED  */}
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
						<Label htmlFor='password'>Current password</Label>
						<Input
							id='password'
							type='password'
							{...register("password", {
								required: "Incorrect password",
							})}
						/>
						{errors.password && <p>{errors.password.message}</p>}
					</div>
					<div className='space-y-1'>
						<Label htmlFor='password'>New password</Label>
						<Input
							id='password'
							type='password'
							{...register("password", {
								required: "Incorrect password",
							})}
						/>
						{errors.password && <p>{errors.password.message}</p>}
					</div>
				</CardContent>
				<CardFooter>
					<div className='grid w-full grid-cols-2 gap-4'>
						<Button type='submit'>Update</Button>
						<ConfirmDeletionDialog />
					</div>
				</CardFooter>
			</Card>
		</form>
  );
}
