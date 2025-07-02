import { useEffect, useState } from "react";
import BookDetailsReviewCard from "./BookDetailsReviewCard";
import { useParams } from "react-router";
import { bookApi } from "@/libraries/axios";
import { PaginationButtons } from "../PaginationButton";
import { Button } from "../shadcnComponents/button";
import {
	Card,
	CardHeader,
	CardContent,
	CardDescription,
} from "../shadcnComponents/card";

type Review = {
	id: string;
	content: string;
	author: {
		id: string;
		username: string;
	};
};

export default function BookReviews() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const params = useParams();
	const { bookId } = params;

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await bookApi.get(
					`/${bookId}/reviews?page=${page}&limit=15`
				);
				setReviews(response.data.bookReviews);
				setTotalPages(response.data.totalPages);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [bookId, page]);

	const handleReviewDeleted = (reviewId: string) => {
		setReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== reviewId)
		);
	};

	if (loading) return <p>Reviews loading...</p>;

	return (
		<div className='mt-10 px-5'>
			<h1 className='text-2xl font-bold mb-6 text-start'>
				Avis sur ce livre
			</h1>
			{reviews.length === 0 ? (
				<div className='mt-10 text-center flex flex-1 justify-center'>
					<Card className='w-100 m-5'>
						<CardHeader className='font-bold'>
							No reviews
						</CardHeader>
						<CardDescription>
							This book has been added to someone's library, but
							no reviews have been posted about it yet.
						</CardDescription>
						<CardContent>
							<Button
								variant='secondary'
								className='m-5 w-50'>
								<a href='/homepage'>Return to homepage</a>
							</Button>
						</CardContent>
					</Card>
				</div>
			) : (
				<>
					<div className='grid grid-cols-2 gap-4'>
						{reviews.map((review) => (
							<BookDetailsReviewCard
								key={review.id}
								reviewId={review.id}
								content={review.content}
								author={review.author}
								onReviewDeleted={handleReviewDeleted}
							/>
						))}
					</div>
					{totalPages > 1 && (
						<PaginationButtons
							currentPage={page}
							totalPages={totalPages}
							onPageChange={setPage}
						/>
					)}
				</>
			)}
		</div>
	);
}
