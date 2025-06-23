// username
// add book

import Navbar from "@/components/websiteComponents/Navbar";
import { ModifyUserForm } from "@/forms/ModifyUserForm";
import InfoSection from "@/components/websiteComponents/InfoSection";

// list of all books linked to this account
export default function AccountPage() {
	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center'>
				<ModifyUserForm />
				<InfoSection />
			</div>
		</>
	);
}
