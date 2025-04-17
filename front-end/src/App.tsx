import { useState } from "react";
import type { Books } from "../../back-end/src/books.ts";
import "./App.css";
import { BookForm } from "./MediaForms/BookForm.tsx";
import { RegisterForm } from "./AuthForms/RegisterForm.tsx";

function App() {
  const [books, setBooks] = useState<Books[]>([]);
  // by default the books aren't displayed
  const [showBooks, setShowBooks] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books/books_list");
      const json = await response.json();
      const data: Books[] = json.books;
      // why are we doing that
      if (Array.isArray(data)) {
        setBooks(data);
        setShowBooks(true);
      }
    } catch (error) {
      console.error("Error, failed to fetch the books", error);
    }
  };

  return (
    <>
      <RegisterForm />
      <BookForm />

      <div>
        <button type="submit" id="get" onClick={fetchBooks}>
          {" "}
          GET BOOK{" "}
        </button>
        <button type="submit" onClick={() => setShowBooks(false)}>
          {" "}
          CLEAR LIST{" "}
        </button>
        {/* <button id="get" onClick={fetchBooks}> GET REVIEW</button> */}
      </div>
      {showBooks && (
        <ul>
          {books.map((book) => (
            <li key={book.isbn}>
              {book.title} - {book.author}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
