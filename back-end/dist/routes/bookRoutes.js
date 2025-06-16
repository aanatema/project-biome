"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
console.log("📚 bookRoutes loaded");
const router = express_1.default.Router();
router.post("/new_book", bookController_1.createBook);
router.post("/new_review", bookController_1.createReview);
router.post("/user_reviews", bookController_1.getUserReviews);
// router.get("/books", allBooks);
// router.get("/books/isbn/:isbn", bookByIsbn);
// router.get("/search-google", searchGoogleBooks);
// router.get("/books/author/:author", bookByAuthor);
// router.get("/books/title/:title", bookByTitle);
// router.get("/books/isbn/:title", bookByTitle);
// router.delete("/", deleteReview)
exports.default = router;
