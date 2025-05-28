import { Button } from "@/components/shadcnComponents/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcnComponents/card";
import { Input } from "@/components/shadcnComponents/input";
import { Textarea } from "@/components/shadcnComponents/textarea";
import { Label } from "@radix-ui/react-label";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { openLibFetchByISBN } from "@/api/openLibrary";
import { toast } from "sonner"
import { fetchGoogleBooks } from "@/api/googleBooks";

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
    setValue,
    watch,
    reset,
  } = useForm<BookFormProps>();

  // setValue is used to set the value of the inputs
  const [isLoading, setIsLoading] = useState(false);
  const watchedISBN = watch("isbn");

  useEffect(() => {
    const loadBookData = async () => {
      if (!watchedISBN || watchedISBN.length < 10) return;

      try {
        setIsLoading(true);
        // try open library first
        const openLibData = await openLibFetchByISBN(watchedISBN);
        if (openLibData?.title && openLibData?.author) {
          setValue("title", openLibData.title);
          setValue("author", openLibData.author);

        } else { // try google books
        console.log("Open Library didn't return data, trying Google Books");
        const googleData = await fetchGoogleBooks(watchedISBN);
        if (googleData) {
          setValue("title", googleData.title);
          setValue("author", googleData.author);
        } else {
        console.error("No book found for the given ISBN in both APIs");
        toast.warning("No book found with this ISBN in our external resources", {duration: 5000});
        reset();
        }
      };

      } catch (err) {
        console.error("Error fetching book data", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookData();
  }, [watchedISBN, setValue, reset]);

  // data is an object with the properties of BookFormProps and the values that will be added through the form
  // async to take into account data being sent to the server
  const onSubmit: SubmitHandler<BookFormProps> = async (data) => {
    const bookData = {
      isbn: data.isbn,
      title: data.title,
      author: data.author,
      reviews: [{ review: data.reviews[0] }],
    };

    try { 
      // send the new book
    const response = await fetch("http://localhost:3000/books/new_book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok){
      toast.error("Something happened, please try again")
      reset();
      return console.error("server error in newBook");
    } 

    const json = await response.json();
    console.log("book created", json);
    reset();
    toast.success("Your book has been added successfully!")

  } catch (err) {
    console.log(err);
    toast.error("Something happened, please try again")
  }
  };

  // NOT WORKING FOR NOW GO BACK LATER
  // const isbnRegex = /^(97(8|9))?\d{9}(\d|X)$/;
  // const issnRegex = /^ISSN\s?\d{4}-\d{3}[\dX]$/;
  // const isbnOrIssnRegex = /^(97(8|9))?\d{9}(\d|X)$|^ISSN\s?\d{4}-\d{3}[\dX]$/;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-10 w-140 justify-center">
          <CardHeader>
            <CardTitle>New book</CardTitle>
            <CardDescription className="m-3">Add the ISBN of your book and we'll fetch the infos for you!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="ISBN">ISBN*</Label>
              <Input
                id="isbn"
                placeholder="978-0-316-54142-8"
                disabled={isLoading}
                {...register("isbn", { required: "Incorrect isbn" })}
              />
              {errors.isbn && <p>{errors.isbn.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                placeholder="The Bone Shard Daughter"
                disabled={isLoading}
                {...register("title", { required: "Incorrect title" })}
              />
              {errors.title && <p>{errors.title.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="author">Author*</Label>
              <Input
                id="author"
                placeholder="Andrea Stewart"
                disabled={isLoading}
                {...register("author", { required: "Incorrect author" })}
              />
              {errors.author && <p>{errors.author.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="review">Review</Label>
              <Textarea
                id="review"
                placeholder="Share your thoughts here"
                {...register("reviews")}
              />
              {errors.reviews && <p>{errors.reviews.message}</p>}
            </div>
            <p>Fields with a star (*) are mandatory</p>
          </CardContent>
          <CardFooter>
            <div className="grid w-full grid-cols-2 gap-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Add"}
              </Button>
              <Button variant="outline" type="reset">
                Clear form
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
