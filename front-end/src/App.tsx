import "./App.css";

import { BookForm } from "./forms/BookForm.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { RegisterForm } from "./forms/RegisterForm.tsx";
import LoginForm from "./forms/LoginForm.tsx";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AccountPage from "./pages/AccountPage.tsx";
import LibraryPage from "./pages/LibraryPage.tsx";
import BookDetailsPage from "./pages/BookDetailsPage.tsx";

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
    element: <LibraryPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/books/:isbn",
    element: <BookDetailsPage />,
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
