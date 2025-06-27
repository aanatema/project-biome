import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";
import { Link } from "react-router";

type BookCardProps = {
	title: string;
	author: string;
	isbn: string;
};

export default function BookCard({ title, author, isbn }: BookCardProps) {
	return (
		<Link to={`/books/${isbn}`}>
			<Card className='book-card m-5 w-40 h-65'>
				<CardContent className='space-y-2 text-center'>
					<div className='space-y-1'>
						<Label
							className='font-bold'
							htmlFor='title'>
							{title}
						</Label>
					</div>
					<div className='space-y-1'>
						<Label htmlFor='author'>{author}</Label>
					</div>
					<div className='space-y-1'>
						<Label htmlFor='isbn'>{isbn}</Label>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
