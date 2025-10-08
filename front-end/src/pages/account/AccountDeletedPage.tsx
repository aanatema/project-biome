import { RegisterForm } from "@/forms/RegisterForm";

export default function AccountDeletedPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-20'>
			<h1 className='text-lg'>
				Looks like you don't have an account, create one to access Biome.
			</h1>
			<div className="my-10">
				<RegisterForm />
			</div>
		</div>
	);
}
