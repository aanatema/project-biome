import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { bookApi } from "@/libraries/axios";
import { Button } from "../shadcnComponents/button";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";

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
		<div className='space-y-4'>
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

			{/* pagination controls */}
			<div className='flex justify-center items-center gap-4 mt-6 mb-10'>
				<Button
					variant='outline'
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
					className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
					<ArrowLeft />
				</Button>

				<span className=''>
					Page {page} / {totalPages}
				</span>

				<Button
					variant='outline'
					onClick={() =>
						setPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={page === totalPages}
					className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
					<ArrowRight />
				</Button>
			</div>
		</div>
	);
}
