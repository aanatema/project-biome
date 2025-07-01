import { useEffect, useState } from "react";
import BookDetailsReviewCard from "./BookDetailsReviewCard";
import { useParams } from "react-router";
import { bookApi } from "@/libraries/axios";

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
	const params = useParams();
	const { bookId } = params;

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await bookApi.get(`/${bookId}/reviews`);
				setReviews(response.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [bookId]);
	const handleReviewDeleted = (reviewId: string) => {
		setReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== reviewId)
		);
	};

	if (loading) return <p>Chargement des reviews...</p>;
	if (reviews.length === 0) return <p>Aucune review pour ce livre.</p>;

	return (
		<div className='mt-10 px-5'>
			<h1 className='text-2xl font-bold mb-6 text-start'>
				Avis sur ce livre
			</h1>
			{reviews.length === 0 ? (
				<p className='text-center'>
					Aucune review pour ce livre pour le moment.
				</p>
			) : (
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
			)}
		</div>
	);
}
