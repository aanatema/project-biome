import { type SubmitHandler, useForm } from "react-hook-form";

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
  // async to imitate data being sent to the server
  const onSubmit: SubmitHandler<BookFormProps> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  const isbnRegex = /^(97(8|9))?\d{9}(\d|X)$/;
  const issnRegex = /^ISSN\s?\d{4}-\d{3}[\dX]$/;

  return (
    <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
      {/* the ... is the spread operator, it takes the properties of 'isbn', passing through 'register' to add them to this input  */}
      <input
        {...register("isbn", {
          required: "ISBN / ISSN may be missing or incorrect",
          pattern: isbnRegex || issnRegex,
        })}
        type="text"
        placeholder="isbn or issn"
      />
      {/* linked to the required string */}
      {errors.isbn && <p>{errors.isbn.message}</p>}

      <input {...register("title")} type="text" placeholder="title" />
      <input {...register("author")} type="text" placeholder="author" />
      <input {...register("reviews")} type="text" placeholder="review" />

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
}
