import { useEffect, useState } from "react";
import BookCard from "./BookCard";

type Book = {
  isbn: string;
  title: string;
  author: string;
};

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("http://localhost:3000/books/books_list");
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      {books.map((book) => (
        <BookCard
          key={book.isbn}
          title={book.title}
          author={book.author}
          isbn={book.isbn}
        />
      ))}
    </div>
  );
}
