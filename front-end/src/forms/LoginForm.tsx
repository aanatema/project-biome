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
import { useAuth } from "@/context/AuthContext";
import { Label } from "@radix-ui/react-label";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


export type UserProps = {
  username: string;
  email: string;
  password: string;
};

export default function LoginForm() {
  const { login } = useAuth(); // call Auth context 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserProps>();

const onLoginSubmit: SubmitHandler<UserProps> = async (data) => {
     try {
      const success = await login(data.email, data.password); // call auth context login method
      if(!success) {
        toast.error("Login failed, please check your credentials", {duration: 3000});
        return;
      }else {
      reset();
      console.log("Login data:", data);
      toast.success("Logged in!");
      reset();
      }
    } catch (error) {
      toast.error("Login failed");
    }
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
              {...register("password", { required: "Incorrect password", minLength: { value: 8, message: "Password must be at least 6 characters" } })}              
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
