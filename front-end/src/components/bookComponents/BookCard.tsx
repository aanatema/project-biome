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
			<Card className='book-card w-auto max-w-xs h-65 mx-auto'>
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
