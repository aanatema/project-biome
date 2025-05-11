"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
console.log("📚 bookRoutes loaded");
const router = express_1.default.Router();
router.post("/new_book", bookController_1.newBookMedia);
router.get("/books_list", bookController_1.allBooks);
router.get("/books_list/isbn/:isbn", bookController_1.bookByIsbn);
router.get("/books_list/author/:author", bookController_1.bookByAuthor);
router.get("/books_list/title/:title", bookController_1.bookByTitle);
// router.delete("/", deleteReview)
exports.default = router;
