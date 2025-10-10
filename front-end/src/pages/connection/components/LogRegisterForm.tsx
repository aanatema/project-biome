import LoginForm from "@/pages/connection/components/LoginForm";
import { RegisterForm } from "@/pages/connection/components/RegisterForm";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shadcnComponents/tabs";

export default function LogRegisterForm() {
	return (
		<Tabs
			defaultValue='login'
			className='my-10 w-90'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger
					className='rounded-l-md'
					value='login'>
					Login
				</TabsTrigger>
				<TabsTrigger
					className='rounded-r-md'
					value='register'>
					Register
				</TabsTrigger>
			</TabsList>
			<TabsContent value='login'>
				<LoginForm />
			</TabsContent>
			<TabsContent value='register'>
				<RegisterForm />
			</TabsContent>
		</Tabs>
	);
}
