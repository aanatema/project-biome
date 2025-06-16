// username 
// add book

import NavigationMenuDemo from "@/components/websiteComponents/Navbar";
import { ModifyUserForm } from "@/forms/ModifyUserForm";


// list of all books linked to this account
export default function AccountPage() {
  return (
    <>
    <NavigationMenuDemo/>
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <ModifyUserForm/>
    </div>
    </>
  );
}
