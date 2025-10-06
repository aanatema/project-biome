import Navbar from "@/components/websiteComponents/Navbar";
import { useAuth } from "@/hooks/useAuth";
import UserBooks from "@/components/bookComponents/UserBooks";
import { ProfileButton } from "@/components/userComponents/ProfileSettings";
import NotConnectedPage from "../connection/NotConnectedPage";
import AddBookButton from "@/components/buttons/AddBookButton";

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
				<div className='w-full flex justify-end mb-4 mr-10 mt-5 gap-5'>
					<AddBookButton />
					<ProfileButton />
				</div>
				<div className='w-full flex justify-start mt-5'>
					<h1 className='ml-10 font-semibold text-lg '>Your books</h1>
				</div>

				<div className='w-full flex justify-center pl-10'>
					<UserBooks />
				</div>
			</div>
		</>
	);
}
