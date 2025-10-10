"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const auth_middlewares_1 = require("../auth/auth.middlewares");
console.log("📚 bookRoutes loaded");
const router = express_1.default.Router();
router.post("/add_book_and_review", auth_middlewares_1.verifyToken, bookController_1.createBookAndReview);
router.get("/books", bookController_1.allBooks);
router.get("/reviews", bookController_1.getAllReviews);
router.get("/isbn/:isbn", bookController_1.getBookByIsbn);
router.get("/:bookId/reviews", bookController_1.getReviewsByBookId);
router.get("/user_books", auth_middlewares_1.verifyToken, bookController_1.getUserBooks);
router.delete("/reviews/:id", auth_middlewares_1.verifyToken, bookController_1.deleteReview);
exports.default = router;
