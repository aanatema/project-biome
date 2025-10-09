import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { bookApi } from "@/libraries/axios";
import { PaginationButtons } from "../buttons/PaginationButton";

type Book = {
	id: string;
	isbn: string;
	title: string;
	author: string;
};

export default function BookList() {
	const [books, setBooks] = useState<Book[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchBooks = async () => {
			const res = await bookApi.get(`/books?page=${page}&limit=15`);
			setBooks(res.data.books);
			setTotalPages(res.data.totalPages);
		};

		fetchBooks();
	}, [page]);

	return (
		<>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10'>
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
				<PaginationButtons
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</>
	);
}
