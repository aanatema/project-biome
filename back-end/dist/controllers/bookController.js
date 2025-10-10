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
exports.getAllReviews = void 0;
exports.createBookAndReview = createBookAndReview;
exports.allBooks = allBooks;
exports.getBookByIsbn = getBookByIsbn;
exports.getBookById = getBookById;
exports.getReviewsByBookId = getReviewsByBookId;
exports.getUserBooks = getUserBooks;
exports.deleteReview = deleteReview;
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
        }
        catch (error) {
            console.error("Error during the creation of a new book and review", error);
            return;
        }
    });
}
// GET REQUESTS
function allBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { isbn, title, author } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;
        try {
            const [books, total] = yield Promise.all([
                yield prisma.book.findMany({
                    skip,
                    take: limit,
                    where: Object.assign(Object.assign(Object.assign({}, (isbn && { isbn: String(isbn) })), (title && {
                        title: { contains: String(title), mode: "insensitive" },
                    })), (author && {
                        author: {
                            contains: String(author),
                            mode: "insensitive",
                        },
                    })),
                }),
                prisma.review.count(),
            ]);
            res.json({
                books,
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            });
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
function getBookById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const book = yield prisma.book.findUnique({ where: { id } });
        if (!book)
            return res.status(404).json({ error: "Book not found" });
        res.json(book);
    });
}
//REVIEWS
function getReviewsByBookId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;
        try {
            const [bookReviews, total] = yield Promise.all([
                prisma.review.findMany({
                    skip,
                    take: limit,
                    where: { bookId: bookId },
                    include: {
                        author: {
                            select: { id: true, username: true },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                }),
                prisma.review.count({
                    where: { bookId: bookId },
                }),
            ]);
            res.json({
                bookReviews,
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            });
            console.log("reviews found:", bookReviews);
        }
        catch (error) {
            console.error("Error while retrieving books", error);
            res.status(500).json({ error: "Server error " });
        }
    });
}
function getUserBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;
        try {
            const userReviews = yield prisma.review.findMany({
                skip,
                take: limit,
                where: {
                    authorId: req.user.id,
                },
                include: {
                    book: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            const books = userReviews.map((review) => review.book);
            // avoid having several book card for the same book
            const uniqueBooks = books.filter((book, index, self) => index === self.findIndex((b) => b.id === book.id));
            const totalReviews = yield prisma.review.count({
                where: {
                    authorId: req.user.id,
                },
            });
            return res.status(200).json({
                books: uniqueBooks,
                pagination: {
                    page,
                    limit,
                    totalItems: totalReviews,
                    totalPages: Math.ceil(totalReviews / limit),
                },
            });
        }
        catch (error) {
            console.error("Error retrieving user books:", error);
            return res.status(500).json({ error: "Error retrieving user books" });
        }
    });
}
function deleteReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            return res.status(401).json({ error: "user is not authenticated" });
        }
        try {
            const reviewId = req.params.id;
            const review = yield prisma.review.findFirst({
                where: {
                    id: reviewId,
                    authorId: req.user.id, //delete only user own reviews
                },
            });
            if (!review) {
                return res.status(404).json({
                    error: "Review not found or you don't have permission to delete it",
                });
            }
            yield prisma.review.delete({
                where: {
                    id: reviewId,
                },
            });
            res.status(200).json({
                message: "Review deleted successfully",
                deletedReviewId: reviewId,
            });
        }
        catch (error) {
            console.error("Error while deleting review", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    try {
        const [reviews, total] = yield Promise.all([
            yield prisma.review.findMany({
                skip,
                take: limit,
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    book: {
                        select: {
                            id: true,
                            title: true,
                            author: true,
                            isbn: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            }),
            prisma.review.count(),
        ]);
        res.json({
            reviews,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error during book retrieving",
        });
    }
});
exports.getAllReviews = getAllReviews;
