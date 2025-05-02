import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      Home Page 
      <Link to="/">Homepage</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/new-book">Add Book</Link>
    </div>
  );

  // do a page refresh
}
