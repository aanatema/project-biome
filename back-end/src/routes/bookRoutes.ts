import express from "express";
import {
  newBookMedia,
  allBooks,
  bookByAuthor,
  bookByIsbn,
  bookByTitle,
  searchGoogleBooks,
} from "../controllers/bookController";

console.log("📚 bookRoutes loaded");

const router = express.Router();

router.post("/new_book", newBookMedia);
router.get("/books_list", allBooks);
router.get("/books_list/isbn/:isbn", bookByIsbn);
router.get("/search-google", searchGoogleBooks);
router.get("/books_list/author/:author", bookByAuthor);
router.get("/books_list/title/:title", bookByTitle);
// router.delete("/", deleteReview)

export default router;
