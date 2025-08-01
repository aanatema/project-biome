import express from "express";
import {
	allBooks,
	createBookAndReview,
	deleteReview,
	getAllReviews,
	getBookByIsbn,
	getReviewsByBookId,
	getUserBooks,
	// getUserReviews,
} from "../controllers/bookController";
import { verifyToken } from "../auth/auth.middlewares";

console.log("📚 bookRoutes loaded");

const router = express.Router();

router.post("/book_and_review", verifyToken, createBookAndReview);

router.get("/books", allBooks);
router.get("/reviews", getAllReviews);
router.get("/isbn/:isbn", getBookByIsbn);
router.get("/:bookId/reviews", getReviewsByBookId);
router.get("/user_books", verifyToken, getUserBooks);

router.delete("/reviews/:id", verifyToken, deleteReview);

export default router;
