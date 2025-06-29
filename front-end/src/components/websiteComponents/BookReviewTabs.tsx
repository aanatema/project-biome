import BookList from "../bookComponents/BookList";
import PreviewCard from "../bookComponents/PreviewCard";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../shadcnComponents/tabs";

export default function BookReviewTabs() {
	return (
		<Tabs
			defaultValue='reviews'
			className='mt-10 w-150'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger
					className='rounded-l-md'
					value='reviews'>
					Reviews
				</TabsTrigger>
				<TabsTrigger
					className='rounded-r-md'
					value='books'>
					Books
				</TabsTrigger>
			</TabsList>
			<TabsContent
				className='mt-10'
				value='reviews'>
				<PreviewCard />
			</TabsContent>
			<TabsContent value='books'>
				<BookList />
			</TabsContent>
		</Tabs>
	);
}
