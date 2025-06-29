import { useEffect, useState } from "react";
import BookCard from "./BookCard";

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
			const res = await fetch("http://localhost:3000/books/books");
			if (!res.ok) {
				console.error("Erreur API");
				return;
			}
			const json = await res.json();
			setBooks(json);
		};

		fetchBooks();
	}, []);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 ml-5 mr-5 mt-10'>
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
