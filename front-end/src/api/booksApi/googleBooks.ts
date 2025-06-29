import { toast } from "sonner";

export const fetchGoogleBooks = async (isbn: string) => {
  try {
    const cleanIsbn = isbn.replace(/[-\s]/g, "");

    const response = await fetch(
      `http://localhost:3000/books/search-google?q=isbn:${cleanIsbn}`
    );
    if (!response.ok) throw new Error("Failed to fetch Google Books data");

    const data = await response.json();

    // Check if items exist in the response
    const firstBook = data.items?.[0];
    if (!firstBook) {
      toast.error("No books found for the given ISBN");
      return null;
    }

    const volumeInfo = firstBook.volumeInfo;
    return {
      title: volumeInfo.title || "",
      author: volumeInfo.authors?.[0] || "",
    };
  } catch (error) {
    console.error("Erreur fetchGoogleBooks:", error);
    return null;
  }
};
