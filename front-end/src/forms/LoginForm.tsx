import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type UserProps = {
  username: string;
  email: string;
  password?: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserProps>();

  const onLoginSubmit: SubmitHandler<UserProps> = async (data) => {
    const existingUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = await fetch("http://localhost:3000/users/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(existingUser),
    });

    if (!response.ok) {
      toast.error("Error logging in, verify your credentials");
      return console.error(
        "Server error for newUser, check documentation to resolve"
      );  
    }    

    const json = await response.json();
    reset();
    toast.success("You are now logged in");

    console.log(json);
  };

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)}>
      <Card className="w-140">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log into your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
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

          {/* IMPLEMENT LOGIC ABOUT SENDING AN EMAIL TO RESTER PASSWORD */}
          <p>Forgot your password?</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Connect
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
