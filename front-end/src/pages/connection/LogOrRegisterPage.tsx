import LogRegisterForm from "@/components/userComponents/LogRegisterForm";
import Navbar from "@/components/websiteComponents/Navbar";

export default function LogOrRegisterPage() {
  return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center'>
				<LogRegisterForm />
			</div>
		</>
  );
}
