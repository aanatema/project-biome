"use strict";
// TODO : add router ? add delete and post route route
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("./src/books");
const app = (0, express_1.default)();
const PORT = 3000;
// model : app.METHOD(PATH,HANDLER)
app.get("/books_list", (req, res) => {
    res.json({ result: books_1.bookList });
    console.log(books_1.bookList);
});
// get by...
app.get("/books_list/isbn/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const bookByIsbn = books_1.bookList.find((book) => book.isbn === isbn);
    if (bookByIsbn) {
        res.json({ bookByIsbn });
    }
    else {
        res.status(404);
        console.log("nothing here");
        res.end();
    }
});
app.get("/books_list/title/:title", (req, res) => {
    const title = req.params.title;
    const bookByTitle = books_1.bookList.find((book) => book.title === title);
    res.json({ bookByTitle });
});
app.get("/books_list/author/:author", (req, res) => {
    const author = req.params.author;
    const bookByAuthor = books_1.bookList.find((book) => book.author === author);
    res.json({ bookByAuthor });
});
app.get("/books_list/:isbn/reviews", (req, res) => {
    const { isbn, reviewId } = req.params;
    const book = books_1.bookList.find((book) => book.isbn === isbn);
    const bookReviews = book === null || book === void 0 ? void 0 : book.reviews.find((review) => review.reviewId === reviewId);
    res.json({ bookReviews });
});
// localhost:3000 home page
app.get("/", (req, res) => {
    res.send("this is a get request");
    // example of json format
    res.json({ content: "this is some content", url: req.url });
});
// add a book
app.post("/post", (req, res) => {
    res.send("example");
});
// delete the book
app.delete("/delete", (req, res) => {
    res.end();
});
app.listen(PORT, () => {
    console.log("Server started and listening on port", PORT);
});
