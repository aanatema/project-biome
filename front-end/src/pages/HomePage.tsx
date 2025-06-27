import BookList from "@/components/bookComponents/BookList";
import ReviewCard from "@/components/bookComponents/ReviewCard";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shadcnComponents/tabs";
import Navbar from "@/components/websiteComponents/Navbar";

export default function HomePage() {
	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center'>
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
						<ReviewCard />
					</TabsContent>
					<TabsContent value='books'>
						<BookList />
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}
