import LoginForm from "@/pages/connection/components/LoginForm";

export default function LoggedOutPage() {
	return (
		<div className='flex flex-col items-center justify-center mx-5 my-20'>
			<h1 className='text-lg'>
				You have been disconnected, log in again to access Biome.
			</h1>
			<div className='my-10'>
				<LoginForm />
			</div>
		</div>
	);
}
