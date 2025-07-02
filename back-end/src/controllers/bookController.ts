import type { Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { ExpressRequest } from "../controllers/userControllers";
const prisma = new PrismaClient();

export async function createBookAndReview(req: ExpressRequest, res: Response) {
	if (!req.user) {
		return res.status(401).json({ error: "user is not authenticated" });
	}
	const { isbn, title, author, content } = req.body;

	try {
		let book = await prisma.book.findUnique({
			where: { isbn },
		});
		if (!book) {
			book = await prisma.book.create({
				data: {
					isbn,
					title,
					author,
				},
			});
		}
		const review = await prisma.review.create({
			data: {
				content,
				authorId: req.user.id,
				bookId: book.id,
			},
		});
		res.status(201).json({ book, review });
		console.log("New book and review created:", { book, review });
	} catch (error) {
		console.error(
			"Error during the creation of a new book and review",
			error
		);
		return;
	}
}

// GET REQUESTS
export async function allBooks(req: ExpressRequest, res: Response) {
	const { isbn, title, author } = req.query;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 15;
	const skip = (page - 1) * limit;

	try {
		const [books, total] = await Promise.all([
			await prisma.book.findMany({
				skip,
				take: limit,
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
	} catch (error) {
		console.error("Error while retrieving the books", error);
		res.status(500).json({
			error: "Something happened when retrieving the books",
		});
	}
}

export async function getBookByIsbn(req: ExpressRequest, res: Response) {
	try {
		const { isbn } = req.params;
		const book = await prisma.book.findUnique({
			where: { isbn },
		});

		if (!book) return res.status(404).json({ error: "Book not found" });
		res.json(book);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
}

export async function getBookById(req: ExpressRequest, res: Response) {
	const { id } = req.params;
	const book = await prisma.book.findUnique({ where: { id } });
	if (!book) return res.status(404).json({ error: "Book not found" });
	res.json(book);
}

//REVIEWS
export async function getReviewsByBookId(req: ExpressRequest, res: Response) {
	const { bookId } = req.params;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 15;
	const skip = (page - 1) * limit;

	try {
		const [bookReviews, total] = await Promise.all([
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
			prisma.review.count(),
		]);
		res.json({
			bookReviews,
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		});
		console.log("reviews found:", bookReviews);
	} catch (error) {
		console.error("Error while retrieving books", error);
		res.status(500).json({ error: "Server error " });
	}
}

export async function getUserBooks(req: ExpressRequest, res: Response) {
	if (!req.user) {
		return res.status(401).json({ error: "User is not authenticated" });
	}

	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 15;
	const skip = (page - 1) * limit;

	try {
		const userReviews = await prisma.review.findMany({
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
		const uniqueBooks = books.filter(
			(book, index, self) =>
				index === self.findIndex((b) => b.id === book.id)
		);

		const totalReviews = await prisma.review.count({
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
	} catch (error) {
		console.error("Error retrieving user books:", error);
		return res.status(500).json({ error: "Error retrieving user books" });
	}
}


export async function deleteReview(req: ExpressRequest, res: Response) {
	if (!req.user) {
		return res.status(401).json({ error: "user is not authenticated" });
	}

	try {
		const reviewId = req.params.id;
		const review = await prisma.review.findFirst({
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

		await prisma.review.delete({
			where: {
				id: reviewId,
			},
		});

		res.status(200).json({
			message: "Review deleted successfully",
			deletedReviewId: reviewId,
		});
	} catch (error) {
		console.error("Error while deleting review", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getAllReviews = async (req: ExpressRequest, res: Response) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 15;
	const skip = (page - 1) * limit;

	try {
		const [reviews, total] = await Promise.all([
			await prisma.review.findMany({
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
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Error during book retrieving",
		});
	}
};
