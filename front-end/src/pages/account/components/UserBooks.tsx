import { useEffect, useState } from "react";
import BookCard from "../../../components/bookComponents/BookCard";
import { bookApi } from "@/libraries/axios";
import { Card, CardContent, CardHeader } from "../../../components/shadcnComponents/card";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import AddBookButton from "../../../components/buttons/AddBookButton";
import { PaginationButtons } from "../../../components/buttons/PaginationButton";

type Book = {
	id: string;
	isbn: string;
	title: string;
	author: string;
};

export default function UserBooks() {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);

				const response = await bookApi.get(
					`/user_books?page=${page}&limit=15`
				);

				// Retrieve books or empty array if no books added for this user
				setBooks(response.data.books || []);
				setTotalPages(response.data.totalPages);
			} catch (err) {
				console.error("Error while retrieving the books", err);
				toast.error(
					"Impossible to retrieve books, please try again later"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [page]);

	if (loading) {
		return (
			<div className='text-center my-10'>
				<Card>
					<CardContent>
						Your books are loading... Please wait...
					</CardContent>
				</Card>
			</div>
		);
	}

	if (books.length === 0) {
		return (
			<div className='my-10 text-center'>
				<Card className='w-90 '>
					<CardHeader className='font-bold'>
						Your library looks empty.
					</CardHeader>
					<Label>Add some books to change that!</Label>
					<CardContent>
						<AddBookButton />
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<>
			<div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-5 my-10'>
				{books.map((book) => (
					<BookCard
						key={book.id}
						id={book.id}
						title={book.title}
						author={book.author}
						// isbn={book.isbn}
					/>
				))}
			</div>
			{totalPages > 1 && (
				<div>
					<PaginationButtons
						currentPage={page}
						totalPages={totalPages}
						onPageChange={setPage}
					/>
				</div>
			)}
		</>
	);
}
