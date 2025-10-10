import Navbar from "@/components/websiteComponents/Navbar";
import { BookForm } from "@/pages/addBook/components/BookForm";

export function AddBook() {
	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center'>
				<BookForm />
			</div>
		</>
	);
}
