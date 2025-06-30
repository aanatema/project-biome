import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { bookApi } from "@/libraries/axios";
import { Button } from "../shadcnComponents/button";
import { Card, CardContent, CardHeader } from "../shadcnComponents/card";
import { Label } from "@radix-ui/react-label";

type Book = {
	id: string;
	isbn: string;
	title: string;
	author: string;
};

export default function UserBooks() {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);
				setError(null);

				const res = await bookApi.get("/user_books");

				// Retrieve books or empty array if no books added for this user
				setBooks(res.data.books || []);
			} catch (err) {
				console.error(
					"Erreur lors de la récupération des livres:",
					err
				);
				setError("Impossible de charger vos livres");
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, []);

	if (loading) {
		return (
			<div className='text-center mt-10'>Chargement de vos livres...</div>
		);
	}

	if (error) {
		return <div className='text-center mt-10 text-red-500'>{error}</div>;
	}

	if (books.length === 0) {
		return (
			<div className='mt-10 text-center '>
				<Card className='w-90 '>
					<CardHeader className='font-bold'>
						Your library looks empty.
					</CardHeader>
					<Label>Add some books to change that!</Label>
					<CardContent>
						<Button
							variant='secondary'
							className='m-5 w-40'>
							<a href='/new-book'>Add a book</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10'>
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
