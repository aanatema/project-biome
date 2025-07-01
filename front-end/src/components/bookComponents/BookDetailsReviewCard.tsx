import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";

// This card is used in the book details page to display username and their review

type ReviewCardProps = {
	content: string;
	author: {
		id: string;
		username: string;
	};
};

export default function BookDetailsReviewCard({ content, author }: ReviewCardProps) {
	return (
		<>
			<Card className='book-card mb-5 min-w-90 max-w-170 min-h-30 max-h-60 overflow-y-scroll'>
				<CardContent className='space-y-2 text-center'>
					<div className='text-start'>
						<Label
							className='font-bold'
							htmlFor='username'>
							{author.username}
						</Label>
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
