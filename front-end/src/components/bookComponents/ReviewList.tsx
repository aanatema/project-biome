import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { bookApi } from "@/libraries/axios";
import { PaginationButtons } from "../PaginationButton";

type Review = {
	id: string;
	content: string;
	author: { id: string; username: string };
	book: { id: string; title: string; author: string; isbn: string };
};

export default function AllReviewsPage() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchReviews = async () => {
		try {
			const res = await bookApi.get(`/reviews?page=${page}&limit=6`);
			setReviews(res.data.reviews);
			setTotalPages(res.data.totalPages);
		} catch (err) {
			console.error("Error fetching reviews:", err);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [page]);

	return (
		<section className='space-y-4'>
			<div className='grid grid-cols-1 gap-4'>
				{reviews.map((review) => (
					<ReviewCard
						key={review.id}
						content={review.content}
						author={review.author}
						book={review.book.title}
						bookAuthor={review.book.author}
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
		</section>
	);
}
