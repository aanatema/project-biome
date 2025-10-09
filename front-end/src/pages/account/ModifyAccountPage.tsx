import Navbar from "@/components/websiteComponents/Navbar";
import { ModifyUserForm } from "@/pages/account/components/ModifyUserForm";
import InfoSection from "@/components/websiteComponents/InfoSection";
import { useAuth } from "@/hooks/useAuth";
import NotConnectedPage from "../connection/NotConnectedPage";

export default function ModifyAccountPage() {
	const { user } = useAuth();
	if (!user) {
		return <NotConnectedPage />;
	}
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
