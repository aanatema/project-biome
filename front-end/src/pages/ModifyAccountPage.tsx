// username
// add book

import Navbar from "@/components/websiteComponents/Navbar";
import { ModifyUserForm } from "@/forms/ModifyUserForm";
import InfoSection from "@/components/websiteComponents/InfoSection";
import { useAuth } from "@/Hooks/useAuth";
import NotConnectedPage from "./NotConnectedPage";

// list of all books linked to this account
export default function ModifyAccountPage() {
    const { user } = useAuth();
    if (!user) {
        return <NotConnectedPage />;
    }
    return (
        <>
            <Navbar />
            <div className='grid grid-cols-2 items-center justify-center'>
                <ModifyUserForm />
                <InfoSection />
            </div>
        </>
    );
}
