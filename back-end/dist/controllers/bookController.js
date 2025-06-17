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
exports.createBook = createBook;
exports.createReview = createReview;
exports.getUserReviews = getUserReviews;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// POST REQUESTS
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const userId = req.user?.id;
        // if (!userId) return res.status(401).json({ error: "Not authenticated" });
        const { isbn, title, author } = req.body;
        try {
            const newBook = yield prisma.book.create({
                data: {
                    isbn,
                    title,
                    author,
                },
            });
            res.status(201).json({ newBook });
            // console.log("newBook created:", newBook);
        }
        catch (error) {
            console.error("Error during the creation of a new book", error);
            res
                .status(500)
                .json({ error: "Something happened when creating a new book" });
        }
    });
}
function createReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const userId = req.user?.id;
        // if (!userId) return res.status(401).json({ error: "Not authenticated" });
        const { bookId, authorId, content, createdAt } = req.body;
        try {
            const newReview = yield prisma.review.create({
                data: {
                    content,
                    authorId,
                    bookId,
                    createdAt,
                },
            });
            res.status(201).json({ newReview });
            console.log("newReview created:", newReview);
        }
        catch (error) {
            console.error("Error during the creation of a new review", error);
        }
    });
}
function getUserReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ error: "Not authenticated" });
        try {
            const userReviews = yield prisma.review.findMany({
                where: {
                    authorId: userId,
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
// export async function allBooks(req: ExpressRequest, res: Response) {
//   const { isbn, title, author, reviews } = req.query;
//   const userId = req.user?.id;
//   if (!userId) return res.status(401).json({ error: "Not authenticated" });
//   try {
//     const mediaBooks = await prisma.media.findMany({
//       where: {
//         type: "BOOK", // ✅ Correct : 'type' existe sur Media
//         book: {
//           // ✅ Filtres sur les propriétés du Book
//           ...(isbn && { isbn: String(isbn) }),
//           ...(title && {
//             title: { contains: String(title), mode: "insensitive" },
//           }),
//           ...(author && {
//             author: { contains: String(author), mode: "insensitive" },
//           }),
//         },
//       },
//       include: {
//         book: true,
//         ...(reviews && {
//           reviews: {
//             include: {
//               author: {
//                 select: { id: true, username: true },
//               },
//             },
//           },
//         }),
//       },
//     });
//     // Transformer pour garder la même interface
//     const books = mediaBooks.map((media) => ({
//       isbn: media.book!.isbn,
//       title: media.book!.title,
//       author: media.book!.author,
//       mediaId: media.id,
//       ...(reviews && { reviews: media.reviews }),
//     }));
//     res.status(200).json(books);
//   } catch (error) {
//     console.error("Error while retrieving the books", error);
//     res
//       .status(500)
//       .json({ error: "Something happened when retrieving the books" });
//   }
// }
// export async function searchGoogleBooks(req: Request, res: Response) {
//   const query = req.query.q as string;
//   if (!query) {
//     return res.status(400).json({ error: "Query parameter is required" });
//   }
//   try {
//     const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
//         query
//       )}&key=${apiKey}`
//     );
//     const data = await response.json();
//     res.json(data);
//     console.log("Google Books API response:", data);
//   } catch {
//     console.error("Error fetching data from Google Books API");
//     res.status(500).json({
//       error: "Something happened when retrieving data from Google Books API",
//     });
//   }
// }
// export async function bookByIsbn(req: Request, res: Response) {
//   const isbn = req.params.isbn;
//   try {
//     const book = await prisma.book.findUnique({
//       where: { isbn },
//       include: {
//         reviews: true,
//       },
//     });
//     if (book) {
//       res.status(200).json({ book });
//     } else {
//       res.status(404).json({ message: "Nothing was found" });
//       res.end();
//     }
//   } catch (error) {
//     console.error("Error while fetching book by ISBN:", error);
//     res
//       .status(500)
//       .json({ error: "Something happened when retrieving a book by its ISBN" });
//   }
// }
// export async function bookByAuthor(req: Request, res: Response) {
//   const author = req.params.author;
//   try {
//     const book = await prisma.book.findMany({
//       where: { author },
//       include: { reviews: true },
//     });
//     if (book) {
//       res.status(200).json({ book });
//     } else {
//       res.status(404).json({ message: "No author was found" });
//       res.end();
//     }
//   } catch (error) {
//     console.error("Error while fetching author:", error);
//     res.status(500).json({
//       error: "Something happened when retrieving a book by its author",
//     });
//   }
// }
// export async function bookByTitle(req: Request, res: Response) {
//   const title = req.params.title;
//   try {
//     const book = await prisma.book.findMany({
//       where: { title },
//       include: { reviews: true },
//     });
//     if (book) {
//       res.status(200).json({ book });
//     } else {
//       res.status(404).json({ message: "No book with this title was found" });
//       res.end();
//     }
//   } catch (error) {
//     console.error("Error while fetching a book by its title:", error);
//     res.status(500).json({
//       error: "Something happened when retrieving a book by its title",
//     });
//   }
// }
// // export async function bookReview
// // DELETE REQUESTS
// // export async function deleteReview(req: Request, res: Response){
// //   const review = req.params.reviewId
// //   try {
// //     const review = await prisma.review.delete({
// //       where: {review}
// //     })
// //   } catch(error){
// //   }
// // }
