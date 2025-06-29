"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookAndReview = createBookAndReview;
exports.getReviewsByBookId = getReviewsByBookId;
exports.getUserReviews = getUserReviews;
exports.allBooks = allBooks;
exports.getBookByIsbn = getBookByIsbn;
exports.getBookById = getBookById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createBookAndReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(401).json({ error: "user is not authenticated" });
        }
        const { isbn, title, author, content } = req.body;
        try {
            let book = yield prisma.book.findUnique({
                where: { isbn },
            });
            if (!book) {
                book = yield prisma.book.create({
                    data: {
                        isbn,
                        title,
                        author,
                    },
                });
            }
            const review = yield prisma.review.create({
                data: {
                    content,
                    authorId: req.user.id,
                    bookId: book.id,
                },
            });
            res.status(201).json({ book, review });
            console.log("New book and review created:", { book, review });
        }
        catch (error) {
            console.error("Error during the creation of a new book and review", error);
            return;
        }
    });
}
function getReviewsByBookId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookId } = req.params;
        try {
            const reviews = yield prisma.review.findMany({
                where: { bookId: bookId },
                include: {
                    author: {
                        select: { id: true, username: true },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            res.status(200).json(reviews);
        }
        catch (error) {
            console.error("Error while retrieving books", error);
            res.status(500).json({ error: "Server error " });
        }
    });
}
function getUserReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userReviews = yield prisma.review.findMany({
                where: {
                // authorId: userId,
                },
            });
            res.status(201).json({ userReviews });
        }
        catch (error) {
            console.error("Error while retrieving user reviews", error);
        }
    });
}
// GET REQUESTS
function allBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { isbn, title, author, reviews } = req.query;
        try {
            const books = yield prisma.book.findMany(Object.assign({ where: Object.assign(Object.assign(Object.assign({}, (isbn && { isbn: String(isbn) })), (title && {
                    title: { contains: String(title), mode: "insensitive" },
                })), (author && {
                    author: {
                        contains: String(author),
                        mode: "insensitive",
                    },
                })) }, (reviews && {
                include: {
                    reviews: {
                        include: {
                            author: {
                                select: { id: true, username: true },
                            },
                        },
                    },
                },
            })));
            res.status(200).json(books);
        }
        catch (error) {
            console.error("Error while retrieving the books", error);
            res.status(500).json({
                error: "Something happened when retrieving the books",
            });
        }
    });
}
function getBookByIsbn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { isbn } = req.params;
            const book = yield prisma.book.findUnique({
                where: { isbn },
            });
            if (!book)
                return res.status(404).json({ error: "Book not found" });
            res.json(book);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
;
function getBookById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const book = yield prisma.book.findUnique({ where: { id } });
        if (!book)
            return res.status(404).json({ error: "Book not found" });
        res.json(book);
    });
}
;
