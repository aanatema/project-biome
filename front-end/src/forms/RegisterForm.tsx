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
import { Label } from "@radix-ui/react-label";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type UserProps = {
  username: string;
  email: string;
  password?: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserProps>();

  const onRegisterSubmit: SubmitHandler<UserProps> = async (data) => {
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
      toast.error("Error while registering, verify your credentials");
      reset();
      return console.error(
        "Server error for newUser, check documentation to resolve"
      );
    }
      
    const json = await response.json();
    reset() 
    console.log(json);
  };

  return (
    <form onSubmit={handleSubmit(onRegisterSubmit)}>
      <Card className="w-140">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>No account yet ? Create yours here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              {...register("username", { required: "Incorrect username" })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Incorrect password" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">Register</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
