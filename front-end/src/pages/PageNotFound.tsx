import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      404 page not found
      <Link to="/">Homepage</Link>
    </div>
  );

  // do a page refresh
}
