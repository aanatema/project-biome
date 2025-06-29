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

export async function getReviewsByBookId(req: ExpressRequest, res: Response) {
	const { id } = req.params;

	try {
		const reviews = await prisma.review.findMany({
			where: { bookId: id },
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
	} catch (error) {
		console.error("Error while retrieving books", error);
		res.status(500).json({ error: "Server error " });
	}
}

export async function getUserReviews(req: ExpressRequest, res: Response) {
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

