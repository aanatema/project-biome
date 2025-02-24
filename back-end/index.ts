// TODO : add router ? add delete and post route route

import express, { type Request, type Response } from "express";
import { bookList } from "./src/books";

const app = express();
const PORT = 3000;

// model : app.METHOD(PATH,HANDLER)

app.get("/books_list", (req: Request, res: Response) => {
  res.json({ result: bookList });
  console.log(bookList);
});

// get by...
app.get("/books_list/isbn/:isbn", (req: Request, res: Response) => {
  const isbn = req.params.isbn;
  const bookByIsbn = bookList.find((book) => book.isbn === isbn);
  if ( bookByIsbn) {
    res.json({ bookByIsbn });
  } else {
    res.status(404);
    console.log('nothing here')
    res.end()
  }
});

app.get("/books_list/title/:title", (req: Request, res: Response) => {
  const title = req.params.title;
  const bookByTitle = bookList.find((book) => book.title === title);
  res.json({ bookByTitle });
});

app.get("/books_list/author/:author", (req: Request, res: Response) => {
  const author = req.params.author;
  const bookByAuthor = bookList.find((book) => book.author === author);
  res.json({ bookByAuthor });
});

// localhost:3000 home page
app.get("/", (req: Request, res: Response) => {
  res.send("this is a get request");
  // example of json format
  res.json({ content: "this is some content", url: req.url });
});

// add a book
app.post("/post", (req: Request, res: Response) => {
  res.send("example");
});

// delete the book
app.delete("/delete", (req: Request, res: Response) => {
  res.end();
});

app.listen(PORT, () => {
  console.log("Server started and listening on port", PORT);
});
