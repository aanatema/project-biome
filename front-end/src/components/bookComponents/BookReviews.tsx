import { useEffect, useState } from "react";
import BookDetailsReviewCard from "./BookDetailsReviewCard";
import { useParams } from "react-router";

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

				const res = await fetch(
					`http://localhost:3000/books/${bookId}/reviews`
				);
				console.log("Statut de la réponse:", res.status);
				console.log("Headers de la réponse:", res.headers);
				if (!res.ok)
					throw new Error("Erreur lors du fetch des reviews");

				const data = await res.json();
				console.log("Données reçues:", data);
				console.log("Type des données:", typeof data);
				console.log("Est-ce un tableau?", Array.isArray(data));
				console.log("Reviews fetched:", data);
				setReviews(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [bookId]);

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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{reviews.map((review) => (
						<BookDetailsReviewCard
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
