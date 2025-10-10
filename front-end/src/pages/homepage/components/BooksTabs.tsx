import BookList from "@/pages/homepage/components/BookList";
import AllReviewsPage from "@/pages/homepage/components/ReviewList";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../components/shadcnComponents/tabs";

export default function BookReviewTabs() {
	return (
		<section className='my-10 flex w-full justify-center gap-6'>
			<Tabs
				defaultValue='reviews'
				className='items-center'>
				<TabsList>
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
				<TabsContent value='reviews'>
					<AllReviewsPage />
				</TabsContent>
				<TabsContent value='books'>
					<BookList />
				</TabsContent>
			</Tabs>
		</section>
	);
}
