import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";

// This card is used in the book details page

type ReviewCardProps = {
	content: string;
	author: {
		id: string;
		username: string;
	};
};

export default function ReviewCard({ content, author }: ReviewCardProps) {
	return (
		<>
			<Card className='book-card mb-5 min-w-70 max-w-150 min-h-30 max-h-60 overflow-scroll'>
				<CardContent className='space-y-2 text-center'>
					<Label
						className='font-bold'
						htmlFor='username'>
						hey
					</Label>
					<Label
						className='font-bold'
						htmlFor='username'>
						{author.username}
					</Label>
					<Label
						className='pb-4'
						htmlFor='review'>
						{content}
					</Label>
				</CardContent>
			</Card>
		</>
	);
}
