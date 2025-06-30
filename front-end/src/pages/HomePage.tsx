import BookReviewTabs from "@/components/websiteComponents/BookReviewTabs";
import Navbar from "@/components/websiteComponents/Navbar";

export default function HomePage() {
	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center'>
				<BookReviewTabs />
			</div>
		</>
	);
}
