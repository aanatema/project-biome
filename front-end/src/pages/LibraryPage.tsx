import BookList from "@/components/bookComponents/BookList";
import Navbar from "@/components/websiteComponents/Navbar";

export default function LibraryPage() {
	return (
		<>
			<Navbar />
			<div className='flex flex-col justify-center mt-10'>
				<h1 className='ml-10 font-semibold text-lg '>
					Latest books added to our global library
				</h1>
				<p className='text-md mt-2 ml-10 text-secondary'>
					See what others have been reading lately
				</p>
			</div>
			<BookList />
		</>
	);
}
