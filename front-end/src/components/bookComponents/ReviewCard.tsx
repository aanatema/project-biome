import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../shadcnComponents/card";
import { Link } from "react-router";

type ReviewCardProps = {
  title?: string; //no need to have title for review, but may implement in the future
  author?: string; // author of the review, not the book
  isbn?: string; // not needed for review but for url routing?
};

export default function ReviewCard({ isbn }: ReviewCardProps) {
  // map of the reviews for a specific book
  return (
    // TODO - create this route
    <Link to={`/books/${isbn}/reviews/:reviewId`}> 
      <Card className="book-card mt-10 m-5 w-300 h-50">
        <CardContent className="space-y-2 text-center">
          <div className="space-y-1">
            <Label className="font-bold" htmlFor="title">
              Test
            </Label>
          </div>
          <div className="space-y-1">
            <Label htmlFor="author">TEST</Label>
          </div>
          <div className="space-y-1">
            <Label htmlFor="isbn">TEST</Label>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
