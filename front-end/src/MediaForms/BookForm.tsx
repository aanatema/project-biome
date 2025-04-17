import { type SubmitHandler, useForm } from "react-hook-form";
import "./styles/forms.css";

export type Review = {
  reviewId: string;
  review: string;
};

export type BookFormProps = {
  isbn: string;
  title: string;
  author: string;
  reviews: Review[];
};

export function BookForm() {
  // handleSubmit will make sure the values inside the inputs are valid before submitting
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormProps>();

  // data is an object with the properties of BookFormProps and the values that will be added through the form
  // async to take into account data being sent to the server
  const onSubmit: SubmitHandler<BookFormProps> = async (data) => {
    const bookData = {
      isbn: data.isbn,
      title: data.title,
      author: data.author,
      reviews: [{ review: data.reviews[0] }],
    };

    // send the new book
    const response = await fetch("http://localhost:3000/books/new_book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) return console.error("server error in newBook");

    const json = await response.json();
    console.log("book created", json);
  };

  

  // NOT WORKING FOR NOW GO BACK LATER
  // const isbnRegex = /^(97(8|9))?\d{9}(\d|X)$/;
  // const issnRegex = /^ISSN\s?\d{4}-\d{3}[\dX]$/;
  // const isbnOrIssnRegex = /^(97(8|9))?\d{9}(\d|X)$|^ISSN\s?\d{4}-\d{3}[\dX]$/;

  return (
    <>
      <form
        className="book-form"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        {/* the ... is the spread operator, it takes the properties of 'isbn', passing through 'register' to add them to this input  */}
        <label className="book-label">
          ISBN
          <input
            {...register("isbn", {
              required: "ISBN / ISSN may be missing or incorrect",
              // pattern: isbnOrIssnRegex,
            })}
            type="text"
            placeholder="isbn or issn"
          />
          {errors.isbn && <p>{errors.isbn.message}</p>}
        </label>
        {/* linked to the required string */}
        <label className="book-label title-label">
          TITLE
          <input {...register("title")} type="text" placeholder="title" />
        </label>
        <label className="book-label author-label">
          AUTHOR
          <input {...register("author")} type="text" placeholder="author" />
        </label>
        <label className="book-label review-label">
          REVIEW
          <input
            {...register("reviews.0.review")}
            type="text"
            placeholder="review"
          />
        </label>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Submit"}
        </button>

        <button type="submit" > SEARCH </button>

      </form>
    </>
  );
}
