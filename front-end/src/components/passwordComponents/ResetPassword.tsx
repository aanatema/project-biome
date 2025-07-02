import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcnComponents/card";
import { Button } from "../shadcnComponents/button";
import { Input } from "../shadcnComponents/input";
import { Link } from "react-router";
import { toast } from "sonner";

export default function ResetPassword() {
    
    toast.error("Something happened, please try again later")
    toast.success("Your password has successfully been changed!");
    return (
		<form>
			<Card className='w-140'>
				<CardHeader>
					<CardTitle>Change password</CardTitle>
					<CardDescription>Enter your new password here, don't forget to make it secure!</CardDescription>
				</CardHeader>
				<CardContent className='space-y-2'>
					<div className='space-y-1'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							// {...register("password", {
							// 	required: "Incorrect password",
							// 	minLength: {
							// 		value: 8,
							// 		message:
							// 			"Password must be at least 8 characters",
							// 	},
							// })}
						/>
						{/* {errors.password && <p>{errors.password.message}</p>} */}
					</div>
				</CardContent>
                <CardFooter>
                    <Link to={`/login`}>
					<Button
						className='w-full'
						type='submit'>
						Confirm
                    </Button>
                    </Link>
				</CardFooter>
            </Card>
            </form>
	);
}