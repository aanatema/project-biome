import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { ExpressRequest } from "../controllers/userControllers";
const prisma = new PrismaClient();

// POST REQUESTS
export async function createBook(req: ExpressRequest, res: Response) {
	const userId = req.user?.id;
	if (!userId)
		return (
			res.status(401).json({
				error: "User needs to be authenticated to add a book",
			}) && console.error("User needs to be authenticated to add a book")
		);
	const { isbn, title, author } = req.body;

	try {
		const newBook = await prisma.book.create({
			data: {
				isbn,
				title,
				author,
			},
		});

		res.status(201).json({ newBook });
	} catch (error) {
		console.error("Error during the creation of a new book", error);
		res.status(500).json({
			error: "Something happened when creating a new book",
		});
	}
}

export async function createReview(req: ExpressRequest, res: Response) {
	// const userId = req.user?.id;
	// if (!userId) return res.status(401).json({ error: "Not authenticated" });

	const { bookId, authorId, content, createdAt } = req.body;
	try {
		const newReview = await prisma.review.create({
			data: {
				content,
				authorId,
				bookId,
				createdAt,
			},
		});
		res.status(201).json({ newReview });
		console.log("newReview created:", newReview);
	} catch (error) {
		console.error("Error during the creation of a new review", error);
	}
}

export async function getUserReviews(req: ExpressRequest, res: Response) {
	// const userId = req.user?.id;
	// if (!userId) return res.status(401).json({ error: "Not authenticated" });

	try {
		const userReviews = await prisma.review.findMany({
			where: {
				// authorId: userId,
			},
		});
		res.status(201).json({ userReviews });
	} catch (error) {
		console.error("Error while retrieving user reviews", error);
	}
}

// GET REQUESTS
export async function allBooks(req: ExpressRequest, res: Response) {
	const { isbn, title, author, reviews } = req.query;

	try {
		const books = await prisma.book.findMany({
			where: {
				...(isbn && { isbn: String(isbn) }),
				...(title && {
					title: { contains: String(title), mode: "insensitive" },
				}),
				...(author && {
					author: {
						contains: String(author),
						mode: "insensitive",
					},
				}),
			},
			...(reviews && {
				include: {
					reviews: {
						include: {
							author: {
								select: { id: true, username: true },
							},
						},
					},
				},
			}),
		});

		res.status(200).json(books);
	} catch (error) {
		console.error("Error while retrieving the books", error);
		res.status(500).json({
			error: "Something happened when retrieving the books",
		});
	}
}


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
