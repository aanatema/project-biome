import NavigationMenuDemo from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
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
    formState: { errors },
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
      <NavigationMenuDemo />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-10 w-140 justify-center">
          <CardHeader>
            <CardTitle>New book</CardTitle>
            <CardDescription>Add your latest reading!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="ISBN">ISBN*</Label>
              <Input
                id="isbn"
                placeholder="978-0-316-54142-8"
                {...register("isbn", { required: "Incorrect isbn" })}
              />
              {errors.isbn && <p>{errors.isbn.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                placeholder="The Bone Shard Daughter"
                {...register("title", { required: "Incorrect title" })}
              />
              {errors.title && <p>{errors.title.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="author">Author*</Label>
              <Input
                id="author"
                placeholder="Andrea Stewart"
                {...register("author", { required: "Incorrect author" })}
              />
              {errors.author && <p>{errors.author.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="review">Review</Label>
              <Textarea
                id="review"
                placeholder="Share your thoughts here"
                {...register("reviews", { required: "Incorrect review" })}
              />
              {errors.reviews && <p>{errors.reviews.message}</p>}
            </div>
            <p>Fields with a star (*) are mandatory</p>
          </CardContent>
          <CardFooter>
            <div className="grid w-full grid-cols-2 gap-6">
              <Button type="submit">
                Add
              </Button>
              <Button variant="outline">
                Clear form
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
