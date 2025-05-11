import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST REQUESTS
export async function newBookMedia(req: Request, res: Response) {
  const { isbn, title, author, reviews } = req.body;

  try {
    const newBook = await prisma.media.create({
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
  } catch (error) {
    console.error("Error during the creation of a new book", error);
    res
      .status(500)
      .json({ error: "Something happened when creating a new book" });
  }
}

// GET REQUESTS
export async function allBooks(req: Request, res: Response) {
  // retrieve the potentials parameters
  const { isbn, title, author, reviews } = req.query;

  try {
    // searchBy x logic
    const books = await prisma.book.findMany({
      where: {
        isbn: isbn ? String(isbn) : undefined,
        title: title ? String(title) : undefined,
        author: author ? String(author) : undefined,
      },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error while retrieving the books", error);
    res
      .status(500)
      .json({ error: "Something happened when retrieving the books" });
  }
}

export async function bookByIsbn(req: Request, res: Response) {
  const isbn = req.params.isbn;

  try {
    const book = await prisma.book.findUnique({
      where: { isbn },
      include: {
        reviews: true,
      },
    });

    if (book) {
      res.status(200).json({ book });
    } else {
      res.status(404).json({ message: "Nothing was found" });
      res.end();
    }
  } catch (error) {
    console.error("Error while fetching book by ISBN:", error);
    res
      .status(500)
      .json({ error: "Something happened when retrieving a book by its ISBN" });
  }
}

export async function bookByAuthor(req: Request, res: Response) {
  const author = req.params.author;

  try {
    const book = await prisma.book.findMany({
      where: { author },
      include: { reviews: true },
    });
    if (book) {
      res.status(200).json({ book });
    } else {
      res.status(404).json({ message: "No author was found" });
      res.end();
    }
  } catch (error) {
    console.error("Error while fetching author:", error);
    res.status(500).json({
      error: "Something happened when retrieving a book by its author",
    });
  }
}

export async function bookByTitle(req: Request, res: Response) {
  const title = req.params.title;

  try {
    const book = await prisma.book.findMany({
      where: { title },
      include: { reviews: true },
    });
    if (book) {
      res.status(200).json({ book });
    } else {
      res.status(404).json({ message: "No book with this title was found" });
      res.end();
    }
  } catch (error) {
    console.error("Error while fetching a book by its title:", error);
    res.status(500).json({
      error: "Something happened when retrieving a book by its title",
    });
  }
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
