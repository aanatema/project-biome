import ReviewCard from "@/components/bookComponents/ReviewCard";
import Navbar from "@/components/websiteComponents/Navbar";

export default function HomePage() {
  return (
		<>
			<Navbar />
			<div className='flex flex-col mt-10 items-center justify-center'>
				<ReviewCard />
			</div>
		</>
  );
}
