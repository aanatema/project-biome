// pages/BookReviewsPage.tsx
import ReviewCard from "@/components/bookComponents/ReviewCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Review = {
	id: string;
	content: string;
	author: {
		id: string;
		username: string;
	};
};

export default function BookReviews() {
	const { bookId } = useParams();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/books/${bookId}/reviews`
				);
				if (!res.ok)
					throw new Error("Erreur lors du fetch des reviews");

				const json = await res.json();
				console.log("Reviews fetched:", { json });
				setReviews(json);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [bookId]);

	if (loading) return <p>Chargement des reviews...</p>;

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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{reviews.map((review) => (
						<ReviewCard
                            key={review.id}
							content={review.content}
							author={review.author}
						/>
					))}
				</div>
			)}
		</div>
	);
}
