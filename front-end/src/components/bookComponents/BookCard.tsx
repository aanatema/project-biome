import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";
import { Link } from "react-router";

export type BookCardProps = {
	id: string;
	title: string;
	author: string;
	isbn: string;
};

export default function BookCard({ id, title, author, isbn }: BookCardProps) {
	return (
		<Link to={`/books/${id}/reviews`}>
			<Card className='book-card m-5 w-40 h-65'>
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
					<div className='space-y-1'>
						<Label
							className='hover:cursor-pointer'
							htmlFor='isbn'>
							{isbn}
						</Label>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
