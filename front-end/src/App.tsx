import { useState, useEffect } from "react";
import type { Books } from "../../back-end/src/books.ts";
import "./App.css";

function App() {
  
  const [books, setBooks] = useState<Books[]>([]); // const [formData, setFormData] = useEffect({isbn: '', title: '', author:'', review: ''});

  // const postBtn = document.getElementById('post');
  // const getBtn = document.getElementById('get');

  // const content = document.getElementsByClassName('content');

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books_list");
      const data: Books[] = await response.json(); // ✅ Assurer le type des données
      if (Array.isArray(data)) {
        setBooks(data.bookList);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des livres", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div>
        <p>isbn</p>
        <input id="isbn" className="content" />

        <p>title</p>
        <input id="title" className="content" />

        <p>author</p>
        <input id="author" className="content" />

        <p>review</p>
        <textarea id="review" className="content" />
      </div>
      <div>
        <button id="post"> POST BOOK </button>
        <button id="get" onClick={fetchBooks}>
          {" "}
          GET BOOK
        </button>
        {/* <button id="get" onClick={fetchBooks}> GET REVIEW</button> */}
      </div>
      {console.log("Book state:", books)}{" "}
      <ul>
        {Array.isArray(books) &&
          books.map((book, index) => (
            <li key={index}>
              {book.isbn} - {book.title}
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
