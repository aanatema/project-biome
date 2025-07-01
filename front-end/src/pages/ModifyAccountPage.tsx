import Navbar from "@/components/websiteComponents/Navbar";
import { ModifyUserForm } from "@/forms/ModifyUserForm";
import InfoSection from "@/components/websiteComponents/InfoSection";
import { useAuth } from "@/Hooks/useAuth";
import NotConnectedPage from "./NotConnectedPage";
import { ConfirmDeletionDialog } from "@/components/userComponents/ConfirmDeletion";

export default function ModifyAccountPage() {
	const { user } = useAuth();
	if (!user) {
		return <NotConnectedPage />;
	}
	return (
		<>
			<Navbar />
			<div className='flex flex-col justify-center items-center'>
				<ModifyUserForm />
				<ConfirmDeletionDialog />
				<InfoSection />
			</div>
		</>
	);
}
