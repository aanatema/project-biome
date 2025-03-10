import { useState, useEffect } from "react";
import type { Books } from "../../back-end/src/books.ts";
import "./App.css";

function App() {
  
  const [books, setBooks] = useState<Books[]>([]); 
  // by default the books aren't displayed
  const [showBooks, setShowBooks] = useState(false);
  // const [formData, setFormData] = useEffect({isbn: '', title: '', author:'', review: ''});

  // const postBtn = document.getElementById('post');
  // const getBtn = document.getElementById('get');

  // const content = document.getElementsByClassName('content');

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books_list");
      const data: Books[] = await response.json(); 
      // why are we doing that
      if (Array.isArray(data)) {
        setBooks(data);
      }
    } catch (error) {
      console.error("Error, failed to fetch the books", error);
    }
  };

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
          GET BOOK
        </button>
        {/* <button id="get" onClick={fetchBooks}> GET REVIEW</button> */}
      </div>
      {/* making sure books are displayed, PROBLEM, it looks like its rendered several times */}
      {console.log("Books", books)}
      {/* PROBLEM, books are already displayed instead of waiting for button click */}
      <ul>
        {Array.isArray(books) &&
          books.map((book, index) => (
            <li key={index}>
             ISBN: {book.isbn} - TITLE: {book.title}
            </li>
          ))}
      </ul>
    </>
  ) 
}

export default App;
