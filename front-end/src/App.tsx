import "./App.css";
import { BookForm } from "./MediaForms/BookForm.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import { RegisterForm } from "./authForms/RegisterForm.tsx";
import LoginForm from "./authForms/LoginForm.tsx";
import HomePage from "./pages/homepage.tsx";

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
