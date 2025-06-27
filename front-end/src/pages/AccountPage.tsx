import Navbar from "@/components/websiteComponents/Navbar";
import { useAuth } from "@/Hooks/useAuth";
import NotConnectedPage from "./NotConnectedPage";
import { Button } from "@/components/shadcnComponents/button";
import BookList from "@/components/bookComponents/BookList";

// list of all books linked to this account
export default function AccountPage() {
	const { user } = useAuth();
	if (!user) {
		return <NotConnectedPage />;
	}
	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center p-4'>
				<div className='w-full flex justify-end mb-4'>
					<Button
						className='mr-10 mt-5'
						variant='outline'>
						<a href='/modify-account'>Update profile</a>
					</Button>
				</div>
				<div className='w-full flex justify-start mt-5'>
					<h1 className='ml-10 font-semibold text-lg '>Your books</h1>
				</div>

				<div className='w-full flex justify-center'>
					<BookList />
				</div>
			</div>
		</>
	);
}
