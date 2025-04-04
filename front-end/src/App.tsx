import { useState } from "react";
import type { Books } from "../../back-end/src/books.ts";
import "./App.css";
import { BookForm } from "./BookForm.tsx";
import { RegisterForm } from "./RegisterForm.tsx";

function App() {
  const [books, setBooks] = useState<Books[]>([]);
  // by default the books aren't displayed
  const [showBooks, setShowBooks] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books_list");
      const data: Books[] = await response.json();
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
        <button id="post"> POST BOOK </button>
        <button id="get" onClick={fetchBooks}>
          {" "}
          GET BOOK{" "}
        </button>
        <button onClick={() => setShowBooks(false)}> CLEAR LIST </button>
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
