import { Button } from "../shadcnComponents/button";

export default function AddBookButton() {
    return (
		<Button variant='secondary'>
			<a href='/new-book'>Add a book</a>
		</Button>
	);
}