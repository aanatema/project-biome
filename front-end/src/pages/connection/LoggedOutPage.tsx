import LoginForm from "@/forms/LoginForm";

export default function LoggedOutPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-20'>
			<h1 className='text-lg'>
				You have been disconnected, log in again to access Biome.
			</h1>
			<div className="mt-10">
				<LoginForm />
			</div>
		</div>
	);
}
