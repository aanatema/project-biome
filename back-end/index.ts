// TODO : add router ? add delete and post route route

import express, { type Request, type Response } from "express";
import { bookList } from "./src/books";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

// maybe change this to be more secure ? localhost:3000 doesn't work
app.use(
  express.json(),
  cors({
    origin: "http://localhost:5173",
  })
);

// model : app.METHOD(PATH,HANDLER)

// POST REQUESTS

app.post("/new_user", async (req: Request, res: Response) => {
  const { username, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
      },
    });
    res.status(201).json({ newUser });
    console.log("newuser index file", newUser );
  } catch (error) {
    console.error("Something happened during the user's creation", error);
    res
      .status(500)
      .json({ error: "Something happened during the user's creation" });
  }
});

app.post("/new_media/new_book", async (req: Request, res: Response) => {
  const { isbn, title, author, reviews } = req.body;

  try {
    const newBook = await prisma.media.create({
      data: {
        type: "BOOK",
        book: {
          create: {
            isbn,
            title,
            author,
          },
        },
        // PROBLEM with review because of the review author id
        // reviews: {
        //   create: reviews.map((review: any) => ({
        //     content: review.review,
        //     rating: 5,
        //     review_author: {id: "8afd13a0-f7f8-40ba-a354-58dcb9f0b275"},
        //   })),
        // },
      },
    });
    res.status(201).json({ newBook });
    console.log("newBook index file", newBook);
  } catch (error) {
    console.error(
      "Something happened during the creation of a new book",
      error
    );
    res.status(500);
  }
});

// add a book
app.post("/post/book", (req: Request, res: Response) => {
  const { isbn, title, author, review } = req.body;
  console.log("book added : ", req.body);
  res.send("example");
});

// GET REQUESTS
app.get("/books_list", (req: Request, res: Response) => {
  res.json(bookList);
});

// get by...
app.get("/books_list/isbn/:isbn", (req: Request, res: Response) => {
  const isbn = req.params.isbn;
  const bookByIsbn = bookList.find((book) => book.isbn === isbn);
  if (bookByIsbn) {
    res.json({ bookByIsbn });
  } else {
    res.status(404);
    console.log("nothing here");
    res.end();
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

app.get(
  "/books_list/isbn/:isbn/reviews/:reviewId",
  (req: Request, res: Response) => {
    const { isbn, reviewId } = req.params;
    const book = bookList.find((book) => book.isbn === isbn);
    const bookReviews = book?.reviews.find(
      (review) => review.reviewId === reviewId
    );
    res.json({ bookReviews });
  }
);

// localhost:3000 home page
app.get("/", (req: Request, res: Response) => {
  res.send("this is a get request");
  // example of json format
  res.json({ content: "this is some content", url: req.url });
});

// delete the book
app.delete(
  "/delete/isbn/:isbn/reviews/:reviewId",
  (req: Request, res: Response) => {
    res.end();
  }
);

app.listen(PORT, () => {
  console.log("Server started and listening on port", PORT);
});
