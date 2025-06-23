import BookList from "@/components/bookComponents/BookList";
import ReviewCard from "@/components/bookComponents/ReviewCard";
import Navbar from "@/components/websiteComponents/Navbar";

export default function LibraryPage() {
	return (
		<>
			<Navbar />
			<BookList />
			<ReviewCard />
		</>
	);
}
