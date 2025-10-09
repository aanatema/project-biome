import Navbar from "@/components/websiteComponents/Navbar";
import { useAuth } from "@/hooks/useAuth";
import UserBooks from "@/components/bookComponents/UserBooks";
import NotConnectedPage from "../connection/NotConnectedPage";
import AddBookButton from "@/components/buttons/AddBookButton";
import { ProfileButton } from "./components/ProfileSettings";

// list of all books linked to this account
export default function AccountPage() {
	const { user } = useAuth();
	if (!user) {
		return <NotConnectedPage />;
	}
	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center'>
				<div className='w-full flex justify-end my-5 mr-10 gap-5'>
					<AddBookButton />
					<ProfileButton />
				</div>
				<div className='w-full flex justify-start my-5'>
					<h1 className='mx-5 font-semibold text-lg '>Your books</h1>
				</div>

				<div className='w-full flex justify-center mx-5'>
					<UserBooks />
				</div>
			</div>
		</>
	);
}
