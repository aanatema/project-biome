import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";
import { useAuth } from "@/hooks/useAuth";
import DeleteReview from "./DeleteReview";

// This card is used in the book details page to display username and their review

type ReviewCardProps = {
	reviewId: string;
	content: string;
	author: {
		id: string;
		username: string;
	};
	//onClick review will be deleted
	onReviewDeleted: (reviewId: string) => void;
};

export default function BookDetailsReviewCard({
	reviewId,
	content,
	author,
	onReviewDeleted,
}: ReviewCardProps) {
	const { user } = useAuth();
	// only the user can delete its own review
	const canDelete = user && user.id === author.id;

	return (
		<>
			<Card className='book-card mb-5 min-w-90 max-w-170 min-h-30 max-h-60 overflow-y-scroll'>
				<CardContent className='space-y-2 text-center'>
					<div className='grid grid-cols-2'>
						<div className='text-start'>
							<Label
								className='font-bold'
								htmlFor='username'>
								{author.username}
							</Label>
						</div>
						<div className='text-end'>
							{canDelete && (
								<DeleteReview
									reviewId={reviewId}
									onReviewDeleted={onReviewDeleted}
								/>
							)}
						</div>
					</div>
					<div className='text-start'>
						<Label
							className='pb-4 text-start'
							htmlFor='review'>
							{content}
						</Label>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
