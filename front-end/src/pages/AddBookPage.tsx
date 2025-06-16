import NavigationMenuDemo from "@/components/websiteComponents/Navbar";
import { BookForm } from "@/forms/BookForm";

export function AddBook() {

  return (
    <>
      <NavigationMenuDemo />
      <div className="flex flex-col items-center justify-center"> 
        <BookForm />
      </div>
    </>
  );
}
