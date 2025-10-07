import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";
import { Link } from "react-router";

export type BookCardProps = {
	id: string;
	title: string;
	author: string;
};

export default function BookCard({ id, title, author }: BookCardProps) {
	return (
		<Link to={`/books/${id}/reviews`}>
			<Card className='book-card w-40 h-60 md:h-65 md:w-45 hover:border-yellow hover:shadow-lg'>
				<CardContent className='space-y-2 text-center'>
					<div className='space-y-1'>
						<Label
							className='font-bold hover:cursor-pointer'
							htmlFor='title'>
							{title}
						</Label>
					</div>
					<div className='space-y-1 '>
						<Label
							className='hover:cursor-pointer'
							htmlFor='author'>
							{author}
						</Label>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
