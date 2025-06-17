import ReviewCard from "@/components/bookComponents/ReviewCard";
import NavigationMenuDemo from "@/components/websiteComponents/Navbar";

export default function HomePage() {
  return (
    <>
    <NavigationMenuDemo/>
      <div className="flex flex-col mt-10 items-center justify-center"> 
        <ReviewCard/>
    </div>
    </>
  );
}
