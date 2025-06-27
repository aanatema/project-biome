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
    <>
  {/* TODO - create this route */}
    <Link to={`/books/${isbn}/reviews/:reviewId`}> 
      <Card className="book-card mb-5 min-w-70 max-w-150 min-h-30 max-h-60 overflow-scroll">
        <CardContent className="space-y-2">
            <Label className="font-bold" htmlFor="title">
              The priory of The Orange Tree
            </Label>
          <div>
            <Label htmlFor="author">Samantha Shannon</Label>
          </div>
            <Label className="pb-4" htmlFor="isbn">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, odio quis tincidunt lobortis, risus nisi dapibus lacus, sed finibus sem purus nec mi. Fusce blandit purus dignissim justo pulvinar mollis. Nam lobortis ante quis tellus consequat, sed suscipit nulla dictum. Nunc suscipit vitae nulla sit amet elementum. Suspendisse ultrices dui vel ipsum scelerisque, iaculis posuere ex tempus.Nulla facilisi. Nulla facilisi. Etiam leo quam, venenatis eget elit eu, maximus ullamcorper ex. Nunc facilisis justo vitae enim fringilla, et scelerisque justo varius.</Label>
        </CardContent>
      </Card>
    </Link>
    <Link to={`/books/${isbn}/reviews/:reviewId`}> 
    <Card className="book-card mb-5 w-150 min-h-30 max-h-60 overflow-scroll">
      <CardContent className="space-y-2">
          <Label className="font-bold" htmlFor="title">
            The priory of The Orange Tree
          </Label>
        <div>
          <Label htmlFor="author">Samantha Shannon</Label>
        </div>
        <div>
          <Label className="pb-4" htmlFor="isbn">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, odio quis tincidunt lobortis, risus nisi dapibus lacus, sed finibus sem purus nec mi. Fusce blandit purus dignissim justo pulvinar mollis. </Label>
        </div>
      </CardContent>
    </Card>
      </Link>
      <Link to={`/books/${isbn}/reviews/:reviewId`}> 
    <Card className="book-card mb-5 w-150 min-h-50 max-h-60 overflow-scroll">
      <CardContent className="space-y-2">
          <Label className="font-bold" htmlFor="title">
            The priory of The Orange Tree
          </Label>
        <div>
          <Label htmlFor="author">Samantha Shannon</Label>
        </div>
        <div>
          <Label className="pb-4" htmlFor="isbn">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, odio quis tincidunt lobortis, risus nisi dapibus lacus, sed finibus sem purus nec mi. Fusce blandit purus dignissim justo pulvinar mollis. Nam lobortis ante quis tellus consequat, sed suscipit nulla dictum. Nunc suscipit vitae nulla sit amet elementum. Suspendisse ultrices dui vel ipsum scelerisque, iaculis posuere ex tempus.Nulla facilisi. Nulla facilisi. Etiam leo quam, venenatis eget elit eu, maximus ullamcorper ex. Nunc facilisis justo vitae enim fringilla, et scelerisque justo varius.</Label>
        </div>
      </CardContent>
    </Card>
  </Link>
  <Link to={`/books/${isbn}/reviews/:reviewId`}> 
    <Card className="book-card mb-5 w-150 min-h-50 max-h-60 overflow-scroll">
      <CardContent className="space-y-2">
          <Label className="font-bold" htmlFor="title">
            The priory of The Orange Tree
          </Label>
        <div>
          <Label htmlFor="author">Samantha Shannon</Label>
        </div>
        <div>
          <Label className="pb-4" htmlFor="isbn">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, odio quis tincidunt lobortis, risus nisi dapibus lacus, sed finibus sem purus nec mi. Fusce blandit purus dignissim justo pulvinar mollis. Nam lobortis ante quis tellus consequat, sed suscipit nulla dictum. Nunc suscipit vitae nulla sit amet elementum. Suspendisse ultrices dui vel ipsum scelerisque, iaculis posuere ex tempus.Nulla facilisi. Nulla facilisi. Etiam leo quam, venenatis eget elit eu, maximus ullamcorper ex. Nunc facilisis justo vitae enim fringilla, et scelerisque justo varius.</Label>
        </div>
      </CardContent>
    </Card>
  </Link>
    </>
  );
}
