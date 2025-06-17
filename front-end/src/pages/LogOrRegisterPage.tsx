import LogRegisterForm from "@/components/userComponents/LogRegisterForm";
import NavigationMenuDemo from "@/components/websiteComponents/Navbar";

export default function LogOrRegisterPage() {
  return (
    <>
    <NavigationMenuDemo/>
      <div className="flex flex-col items-center justify-center"> 
    <LogRegisterForm/>
    </div>
    </>
  );
}
