import { Button } from "@/components/shadcnComponents/button";

export default function NotConnectedPage() {
	return (
		<div className='flex flex-col items-center justify-center mx-5 my-20'>
			<p className='text-lg'>
				You must be logged in to access this page.
			</p>
			<Button
				className='m-5 '
				variant='secondary'>
				<a href='/login-or-register'>Login or Register</a>
			</Button>
		</div>
	);
}
