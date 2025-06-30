import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { bookApi } from "@/libraries/axios";

type Book = {
	id: string;
	isbn: string;
	title: string;
	author: string;
};

export default function BookList() {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		const fetchBooks = async () => {
			const res = await bookApi.get("/books");
			setBooks(res.data);
		};

		fetchBooks();
	}, []);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-10 mb-10'>
			{books.map((book) => (
				<BookCard
					key={book.id}
					id={book.id}
					title={book.title}
					author={book.author}
					isbn={book.isbn}
				/>
			))}
		</div>
	);
}
