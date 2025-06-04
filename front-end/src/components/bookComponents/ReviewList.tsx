// import { useEffect, useState } from "react";
// import ReviewCard from "./ReviewCard";

// type Review = {
//   isbn: string;
//   title: string;
//   author: string;
// };

// export default function ReviewList() {
//   const [reviews, setReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       const res = await fetch("http://localhost:3000/books/books");
//       if (!res.ok) {
//         console.error("Erreur API");
//         return;
//       }
//       const json = await res.json();
//       setReviews(json);
//     };

//     fetchReviews();
//   }, []);

//   return (
//     <div className="grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 xl:grid-rows-5 mt-10">
//       {reviews.map((review) => (
//         <ReviewCard
//           key={review.isbn}
//           title={review.title}
//           author={review.author}
//           isbn={review.isbn}
//         />
//       ))}
//     </div>
//   );
// }
