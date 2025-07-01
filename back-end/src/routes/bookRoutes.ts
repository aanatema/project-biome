import express from "express";
import {
	allBooks,
	createBookAndReview,
	deleteReview,
	getAllReviews,
	getBookByIsbn,
	getReviewsByBookId,
	getUserBooks,
} from "../controllers/bookController";
import { verifyToken } from "../auth/auth.middlewares";

console.log("📚 bookRoutes loaded");

const router = express.Router();

router.post("/add_book_and_review", verifyToken, createBookAndReview);

router.get("/user_books", verifyToken, getUserBooks);
router.get("/books", allBooks);
router.get("/reviews", getAllReviews);
router.get("/isbn/:isbn", getBookByIsbn);
router.get("/:bookId/reviews", getReviewsByBookId);

router.delete("/reviews/:id", verifyToken, deleteReview);

export default router;
