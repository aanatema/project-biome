import NavigationMenuDemo from "@/components/Navbar";
import { BookForm } from "@/forms/BookForm";

export function AddBook() {

  return (
    <>
      <NavigationMenuDemo />
      <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
        <BookForm />
      </div>
    </>
  );
}
