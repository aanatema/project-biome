import { ConfirmDeletionDialog } from "@/components/ConfirmDeletion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { type SubmitHandler, useForm } from "react-hook-form";

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

    if (!response.ok)
      return console.error(
        "Server error for newUser, check documentation to resolve"
      );

    const json = await response.json();
    console.log(json);

    const confirmUserDeletion = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/users/user_deletion",
          {}
        );
      } catch (error) {}
    };
  };

  return (
    <form onSubmit={handleSubmit(onModifySubmit)}>
      <Card className="mt-10 w-140">
        <CardHeader>
          <CardTitle>Modify your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              {...register("username", {
                required: "You can not have an empty username",
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          {/* TODO ALLOW IMPORTANT CHANGE ONLY IF THE PASSWORD HAS BEEN VERIFIED  */}
          {/* WARNING : if this is a reset password, we can't ask for this check  */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Incorrect email" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Current password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Incorrect password" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Incorrect password" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid w-full grid-cols-2 gap-6">
            <Button className="" type="submit">
              Update
            </Button>
            <ConfirmDeletionDialog />
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
