import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { openLibFetchByISBN } from "@/api/booksApi/openLibrary";
import { toast } from "sonner";
import { fetchGoogleBooks } from "@/api/booksApi/googleBooks";
import { useAuth } from "@/hooks/useAuth";
import NotConnectedPage from "@/pages/connection/NotConnectedPage";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcnComponents/card";
import { Button } from "@/components/shadcnComponents/button";
import { Input } from "@/components/shadcnComponents/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/shadcnComponents/textarea";
import { bookApi } from "@/libraries/axios";

type FormValues = {
	isbn: string;
	title: string;
	author: string;
	review?: string;
};

export function BookForm() {
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<FormValues>();

	const [isLoading, setIsLoading] = useState(false);
	const watchedISBN = watch("isbn");

	useEffect(() => {
		const checkAndLoadBook = async () => {
			if (!watchedISBN) return;
			setIsLoading(true);

			try {
				// try open library
				const openLibData = await openLibFetchByISBN(watchedISBN);
				if (openLibData?.title && openLibData?.author) {
					setValue("title", openLibData.title);
					setValue("author", openLibData.author);
				} else {
					// try google books
					const googleData = await fetchGoogleBooks(watchedISBN);
					if (googleData) {
						setValue("title", googleData.title);
						setValue("author", googleData.author);
					} else {
						console.error(
							"No book found for the given ISBN in both APIs"
						);
						toast.warning(
							"This ISBN was not found in our external resources",
							{ duration: 4000 }
						);
						reset();
					}
				}
			} catch (err) {
				console.error("Error fetching book data", err);
				toast.error("Something happened, please try again later", {
					duration: 4000,
				});
			} finally {
				setIsLoading(false);
			}
		};

		checkAndLoadBook();
	}, [watchedISBN, setValue, reset]);

	if (!user) {
		return <NotConnectedPage />;
	}

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true);

		try {
			const payload = {
				isbn: data.isbn,
				title: data.title,
				author: data.author,
				content: data.review,
			};

			await bookApi.post("/add_book_and_review", payload);

			toast.success("Your addition has been successful!", {
				duration: 4000,
			});
			reset();
		} catch (error) {
			console.error("Failed to send:", error);
			toast.error("Something happened, please try again later");
		} finally {
			setIsLoading(false);
		}
	};

	const isbnFormat = /^(97(8|9))?\-?\d{1,5}\-?\d{1,7}\-?\d{1,7}\-?(\d|X)$/i;

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card className='mt-10 w-140 justify-center'>
					<CardHeader>
						<CardTitle>New book</CardTitle>
						<CardDescription className='m-3'>
							Add the ISBN of your book and we'll fetch the rest
							for you!
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='ISBN'>ISBN*</Label>
							<Input
								id='isbn'
								placeholder='978-0-316-54142-8'
								disabled={isLoading}
								{...register("isbn", {
									required: "Incorrect isbn",
									pattern: {
										value: isbnFormat,
										message: "Invalid ISBN format",
									},
								})}
							/>
							{errors.isbn && (
								<p className='text-destructive'>
									{errors.isbn.message}
								</p>
							)}
						</div>
						<div className='space-y-1'>
							<Label htmlFor='title'>Title*</Label>
							<Input
								id='title'
								placeholder='The Bone Shard Daughter'
								disabled={isLoading}
								{...register("title", {
									required: "Incorrect title",
								})}
							/>
							{errors.title && (
								<p className='text-destructive'>
									{errors.title.message}
								</p>
							)}
						</div>
						<div className='space-y-1'>
							<Label htmlFor='author'>Author*</Label>
							<Input
								id='author'
								type='text'
								placeholder='Andrea Stewart'
								disabled={isLoading}
								{...register("author", {
									required: "Incorrect author",
									pattern: {
										value: /^[A-Za-zÀ-ÖØ-öø-ÿ \-']{2,}$/,
										message: "Invalid author name",
									},
								})}
							/>
							{errors.author && (
								<p className='text-destructive'>
									{errors.author.message}
								</p>
							)}
						</div>
						<div className='space-y-1'>
							<Label htmlFor='review'>Review</Label>
							<Textarea
								id='review'
								placeholder='Share your thoughts here'
								{...register("review")}
							/>
							{errors.review && <p>{errors.review.message}</p>}
						</div>
						<p>Fields with a star (*) are mandatory</p>
					</CardContent>
					<CardFooter>
						<div className='grid w-full grid-cols-2 gap-6'>
							<Button
								type='submit'
								variant='default'
								disabled={isLoading}>
								{isLoading ? "Loading..." : "Add"}
							</Button>
							<Button
								variant='destructive'
								type='reset'>
								Clear form
							</Button>
						</div>
					</CardFooter>
				</Card>
			</form>
		</>
	);
}
