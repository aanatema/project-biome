import Navbar from "@/components/websiteComponents/Navbar";
import { ModifyUserForm } from "@/forms/ModifyUserForm";
import InfoSection from "@/components/websiteComponents/InfoSection";
import { useAuth } from "@/hooks/useAuth";
import NotConnectedPage from "./NotConnectedPage";

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
