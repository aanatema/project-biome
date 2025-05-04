import "./App.css";
import { BookForm } from "./MediaForms/BookForm.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { RegisterForm } from "./authForms/RegisterForm.tsx";
import LoginForm from "./authForms/LoginForm.tsx";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
