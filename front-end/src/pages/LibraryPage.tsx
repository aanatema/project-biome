import BookList from "@/components/bookComponents/BookList";
import ReviewCard from "@/components/bookComponents/ReviewCard";
import NavigationMenuDemo from "@/components/websiteComponents/Navbar";

export default function LibraryPage() {
  return (
    <>
      <NavigationMenuDemo />
      <BookList/>
      <ReviewCard/>
    </>
  );
}
