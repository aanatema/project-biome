import "./App.css";
// import "./index.css"
import { BookForm } from "./forms/BookForm.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { RegisterForm } from "./forms/RegisterForm.tsx";
import LoginForm from "./forms/LoginForm.tsx";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import BookCard from "./components/BookCard.tsx";
import AccountPage from "./pages/AccountPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <PageNotFound /> },
  {
    path: "/register",
    element: <LoginForm />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/login",
    element: <RegisterForm />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/new-book",
    element: <BookForm />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/library",
    element: <BookCard />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/account",
    element: <AccountPage />,
    errorElement: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
