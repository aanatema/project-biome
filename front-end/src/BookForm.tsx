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
  const { register, handleSubmit } = useForm<BookFormProps>();
  // data is an object with the properties of BookFormProps and the values that will be added through the form
  const onSubmit: SubmitHandler<BookFormProps> = (data) => {
    console.log(data)
  }


  return (
    <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
      {/* the ... is the spread operator, it takes the properties of 'isbn', passing through 'register' to add them to this input  */}
      <input {...register("isbn")} type="text" placeholder="isbn" />
      <input {...register("title")} type="text" placeholder="title" />
      <input {...register("author")} type="text" placeholder="author" />
      <input {...register("reviews")} type="text" placeholder="review" />

      <button type="submit">Submit</button>
    </form>
  );
}
