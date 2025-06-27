import { Button } from "@/components/shadcnComponents/button";

export default function NotConnectedPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-20'>
			<p className='text-lg'>
				You must be logged in to access this page.
			</p>
			<Button
				className='m-5 '
				variant='secondary'>
				<a href='/login-or-register'>Login or Register</a>
			</Button>
			<p className='text-lg mt-5'>
				Without creating an account, you can still take a look at these
				pages
			</p>
			<div className='grid grid-cols-2 gap-4 mt-5'>
				<Button variant='secondary'>
					<a href='/homepage'>Homepage</a>
				</Button>
				<Button variant='secondary'>
					<a href='/library'>Library</a>
				</Button>
			</div>
		</div>
	);
}
