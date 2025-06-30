import Navbar from "@/components/websiteComponents/Navbar";
import { useAuth } from "@/Hooks/useAuth";
import NotConnectedPage from "./NotConnectedPage";
import { ProfileSettingsButton } from "@/components/userComponents/ProfileSettings";
import UserBooks from "@/components/bookComponents/UserBooks";

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
				<div className='w-full flex justify-end mb-4 mr-10 mt-5'>
					<ProfileSettingsButton />
				</div>
				<div className='w-full flex justify-start mt-5'>
					<h1 className='ml-10 font-semibold text-lg '>Your books</h1>
				</div>

				<div className='w-full flex justify-start pl-10 '>
					<UserBooks />
				</div>
			</div>
		</>
	);
}
