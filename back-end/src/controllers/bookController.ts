import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function newBookMedia(req: Request, res: Response){
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
    console.error(
      "Something happened during the creation of a new book",
      error
    );
    res.status(500);
  }
};

export async function allBooks(req: Request, res: Response){
  // retrieve the potentials parameters 
  const { isbn, title, author, reviews } = req.query;

  try{
    const books = await prisma.book.findMany();
    res.status(200).json({ books });
  }catch (error){
    // console.error("Something happened when retrieving the books")
    res.status(500).json({error: "Something happened when retrieving the books" });

  }
};

export async function bookByIsbn(req: Request, res: Response){
  const isbn = req.params.isbn;
  const bookByIsbn = prisma.book.findUnique({
    where: {isbn: "ezf"}
  })

  // ((book) => book.isbn === isbn);
  // if (bookByIsbn) {
  //   res.json({ bookByIsbn });
  // } else {
  //   res.status(404);
  //   console.log("nothing here");
  //   res.end();
  // }
};
