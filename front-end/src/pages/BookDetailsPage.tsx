import BookCard from "@/components/bookComponents/BookCard";
import ReviewCard from "@/components/bookComponents/ReviewCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Book = {
	isbn: string;
	title: string;
	author: string;
	reviews?: { review: string }[];
};

export default function BookDetailsPage() {
	const { isbn } = useParams<{ isbn: string }>();
	const [book, setBook] = useState<Book | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/books/isbn/${isbn}`
				);
				if (!res.ok) throw new Error("Book not found");
				const json = await res.json();
				setBook(json.book);
			} catch (err) {
				setError("Failed to load book details");
			}
		};

		fetchBook();
	}, [isbn]);

	if (error) return <p className='text-center mt-10 text-red-600'>{error}</p>;
	if (!book) return <p className='text-center mt-10'>Loading...</p>;

	return (
		<>
			<BookCard
				title={""}
				author={""}
				isbn={""}
			/>
			<ReviewCard />
		</>
	);
}
