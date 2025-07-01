import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { bookApi } from "@/libraries/axios";

type Review = {
	id: string;
	content: string;
	author: {
		id: string;
		username: string;
	};
	book: {
		id: string;
		title: string;
		author: string;
		isbn: string;
	};
};

export default function AllReviewsPage() {
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		const fetchReviews = async () => {
			const res = await bookApi.get("/reviews");
			setReviews(res.data);
		};

		fetchReviews();
	}, []);

	return (
		<div className=''>
			<div className='grid grid-cols-1 gap-4'>
				{reviews.map((review) => (
					<div key={review.id}>
						<ReviewCard
							content={review.content}
							author={review.author}
							book={review.book.title}
							bookAuthor={review.book.author}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
