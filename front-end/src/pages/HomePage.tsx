import LogRegisterForm from "@/components/userComponents/LogRegisterForm";
import NavigationMenuDemo from "@/components/websiteComponents/Navbar";

export default function HomePage() {
  return (
    <>
    <NavigationMenuDemo/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
    <LogRegisterForm/>
    </div>
    </>
  );
}
