import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter } from "../ui/card";

type BookCardProps = {
  title: string;
  author: string;
  isbn: string;
};

export default function BookCard({ title, author, isbn }: BookCardProps) {
  // map of books in database
  // put the cards inside a grid ?
  return (
    <Card className="mt-10 w-50 h-80">
      <CardContent className="space-y-2 text-center">
        <div className="space-y-1">
          <Label className="font-bold" htmlFor="title">
            {title}
          </Label>
        </div>
        <div className="space-y-1">
          <Label htmlFor="author">{author}</Label>
        </div>
        <div className="space-y-1">
          <Label htmlFor="isbn">{isbn}</Label>
        </div>
      </CardContent>
      {/* <CardFooter>
        <Label>Rating</Label>
      </CardFooter> */}
    </Card>
  );
}
