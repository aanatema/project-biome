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
    if (!isbn) {
      setError("Aucun ISBN n’a été fourni dans l’URL");
      return;
    }
    
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books_list/isbn/${isbn}`);
        if (!res.ok) throw new Error("Book not found");
        const json = await res.json();
        setBook(json.book);
      } catch (err) {
        setError("Failed to load book details");
      }
    };

    fetchBook();
  }, [isbn]);

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mt-10 mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
    </div>
  );
}
