// username 
// add book

import NavigationMenuDemo from "@/components/Navbar";
import { ModifyUserForm } from "@/forms/ModifyUserForm";


// list of all books linked to this account
export default function AccountPage() {
  return (
    <>
    <NavigationMenuDemo/>
    <ModifyUserForm/>
    <p>form to modify or delete user</p>
    
    </>
  );
}
