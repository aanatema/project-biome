import express from "express";
import {
	allBooks,
	createBookAndReview,
	getAllReviews,
	getBookByIsbn,
	getReviewsByBookId,
	getUserBooks,
	// getUserReviews,
} from "../controllers/bookController";
import { verifyToken } from "../auth/auth.middlewares";

console.log("📚 bookRoutes loaded");

const router = express.Router();

router.post("/add_book_and_review", verifyToken, createBookAndReview);

router.get("/books", allBooks);
router.get("/reviews", getAllReviews);
router.get("/isbn/:isbn", getBookByIsbn);
router.get("/:bookId/reviews", getReviewsByBookId);
router.get("/user_books", verifyToken, getUserBooks);

export default router;
