import express from "express";
import {
	allBooks,
	bookByIsbn,
	createBook,
	createBookAndReview,
	createReview,
	getUserReviews,
	// bookByAuthor,
	// bookByIsbn,
	// bookByTitle,
	// searchGoogleBooks,
} from "../controllers/bookController";
import { verifyToken } from "../auth/auth.middlewares";

console.log("📚 bookRoutes loaded");

const router = express.Router();

// router.post("/new_book", createBook);
// router.post("/new_review", createReview);
router.post("/add_book_and_review", verifyToken, createBookAndReview);
router.post("/user_reviews",verifyToken, getUserReviews);
router.get("/books", allBooks);

router.get("/books/isbn/:isbn", bookByIsbn);
// router.get("/search-google", searchGoogleBooks);
// router.get("/books/author/:author", bookByAuthor);
// router.get("/books/title/:title", bookByTitle);
// router.get("/books/isbn/:title", bookByTitle);

// router.delete("/", deleteReview)

export default router;
