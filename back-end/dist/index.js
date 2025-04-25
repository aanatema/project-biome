"use strict";
// TODO : add router ? add delete and post route route
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("./src/books");
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = 3000;
// maybe change this to be more secure ? localhost:3000 doesn't work
app.use(express_1.default.json(), (0, cors_1.default)({
    origin: "http://localhost:5173",
}));
// model : app.METHOD(PATH,HANDLER)
// POST REQUESTS
app.post("/new_user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    try {
        const newUser = yield prisma.user.create({
            data: {
                username,
                email,
            },
        });
        res.status(201).json({ newUser });
        console.log("newuser index file", newUser);
    }
    catch (error) {
        console.error("Something happened during the user's creation", error);
        res
            .status(500)
            .json({ error: "Something happened during the user's creation" });
    }
}));
app.post("/new_media/new_book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn, title, author, reviews } = req.body;
    try {
        const newBook = yield prisma.media.create({
            data: {
                type: "BOOK",
                book: {
                    create: {
                        isbn,
                        title,
                        author,
                    },
                },
                // PROBLEM with review because of the review author id
                // reviews: {
                //   create: reviews.map((review: any) => ({
                //     content: review.review,
                //     rating: 5,
                //     review_author: {id: "8afd13a0-f7f8-40ba-a354-58dcb9f0b275"},
                //   })),
                // },
            },
        });
        res.status(201).json({ newBook });
        console.log("newBook index file", newBook);
    }
    catch (error) {
        console.error("Something happened during the creation of a new book", error);
        res.status(500);
    }
}));
// add a book
app.post("/post/book", (req, res) => {
    const { isbn, title, author, review } = req.body;
    console.log("book added : ", req.body);
    res.send("example");
});
// GET REQUESTS
app.get("/books_list", (req, res) => {
    res.json(books_1.bookList);
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
app.get("/books_list/isbn/:isbn/reviews/:reviewId", (req, res) => {
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
// delete the book
app.delete("/delete/isbn/:isbn/reviews/:reviewId", (req, res) => {
    res.end();
});
app.listen(PORT, () => {
    console.log("Server started and listening on port", PORT);
});
