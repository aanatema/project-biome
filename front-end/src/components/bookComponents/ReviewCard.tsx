import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";

// This card is used in the book details page

type ReviewCardProps = {
	content: string;
	author: {
		id: string;
		username: string;
	};
	book: string;
	bookAuthor: string;
};

export default function ReviewCard({
	content,
	author,
	book,
	bookAuthor,
}: ReviewCardProps) {
	return (
		<>
			<Card className='book-card mb-5 min-w-70 max-w-150 min-h-30 max-h-60 overflow-y-scroll'>
				<CardContent className='space-y-2 text-center'>
					<div className='text-start'>
						<Label
							className='font-bold'
							htmlFor='username'>
							{author.username}
						</Label>

						<div>
							<Label
								className='font-medium text-sm'
								htmlFor='book'>
								{book} |{" "}
							</Label>
							<Label
								className='text-sm italic'
								htmlFor='book'>
								{bookAuthor}
							</Label>
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
