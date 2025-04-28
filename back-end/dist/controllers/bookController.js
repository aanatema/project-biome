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
exports.newBookMedia = newBookMedia;
exports.allBooks = allBooks;
exports.bookByIsbn = bookByIsbn;
exports.bookByAuthor = bookByAuthor;
exports.bookByTitle = bookByTitle;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// POST REQUESTS
function newBookMedia(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            console.error("Error during the creation of a new book", error);
            res
                .status(500)
                .json({ error: "Something happened when creating a new book" });
        }
    });
}
// GET REQUESTS
function allBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // retrieve the potentials parameters
        const { isbn, title, author, reviews } = req.query;
        try {
            // searchBy x logic
            const books = yield prisma.book.findMany({
                where: {
                    isbn: isbn ? String(isbn) : undefined,
                    title: title ? String(title) : undefined,
                    author: author ? String(author) : undefined,
                },
            });
            res.status(200).json({ books });
        }
        catch (error) {
            console.error("Error while retrieving the books", error);
            res
                .status(500)
                .json({ error: "Something happened when retrieving the books" });
        }
    });
}
function bookByIsbn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isbn = req.params.isbn;
        try {
            const book = yield prisma.book.findUnique({
                where: { isbn },
                include: {
                    reviews: true,
                },
            });
            if (book) {
                res.status(200).json({ book });
            }
            else {
                res.status(404).json({ message: "Nothing was found" });
                res.end();
            }
        }
        catch (error) {
            console.error("Error while fetching book by ISBN:", error);
            res
                .status(500)
                .json({ error: "Something happened when retrieving a book by its ISBN" });
        }
    });
}
function bookByAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const author = req.params.author;
        try {
            const book = yield prisma.book.findMany({
                where: { author },
                include: { reviews: true },
            });
            if (book) {
                res.status(200).json({ book });
            }
            else {
                res.status(404).json({ message: "No author was found" });
                res.end();
            }
        }
        catch (error) {
            console.error("Error while fetching author:", error);
            res.status(500).json({
                error: "Something happened when retrieving a book by its author",
            });
        }
    });
}
function bookByTitle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = req.params.title;
        try {
            const book = yield prisma.book.findMany({
                where: { title },
                include: { reviews: true },
            });
            if (book) {
                res.status(200).json({ book });
            }
            else {
                res.status(404).json({ message: "No book with this title was found" });
                res.end();
            }
        }
        catch (error) {
            console.error("Error while fetching a book by its title:", error);
            res.status(500).json({
                error: "Something happened when retrieving a book by its title",
            });
        }
    });
}
// DELETE REQUESTS
// export async function deleteReview(req: Request, res: Response){
//   const review = req.params.reviewId
//   try {
//     const review = await prisma.review.delete({
//       where: {review}
//     })
//   } catch(error){
//   }
// }
