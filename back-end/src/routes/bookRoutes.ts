import express from "express";
import {
	allBooks,
	createBookAndReview,
	getAllReviews,
	getBookByIsbn,
	getReviewsByBookId,
	getUserReviews,
} from "../controllers/bookController";
import { verifyToken } from "../auth/auth.middlewares";

console.log("📚 bookRoutes loaded");

const router = express.Router();

// router.post("/new_book", createBook);
// router.post("/new_review", createReview);
router.post("/add_book_and_review", verifyToken, createBookAndReview);
router.post("/user_reviews", verifyToken, getUserReviews);

router.get("/books", allBooks);
router.get("/reviews", getAllReviews);
router.get("/isbn/:isbn", getBookByIsbn);
router.get("/:bookId/reviews", getReviewsByBookId);

export default router;
