export async function openLibFetchByISBN(isbn: string) {
  const cleanIsbn = isbn.replace(/[-\s]/g, "");
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${cleanIsbn}&format=json&jscmd=data`;

  const res = await fetch(url);
  const json = await res.json();
  const book = json[`ISBN:${cleanIsbn}`];

  if (!book) return null;

  return {
    title: book.title || "",
    author: book.authors?.map((a: any) => a.name).join(", ") || "",
  };
}
