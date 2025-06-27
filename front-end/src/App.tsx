import PageNotFound from "./pages/PageNotFound.tsx";
import { RegisterForm } from "./forms/RegisterForm.tsx";
import LoginForm from "./forms/LoginForm.tsx";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AccountPage from "./pages/AccountPage.tsx";
import LibraryPage from "./pages/LibraryPage.tsx";
import BookDetailsPage from "./pages/BookDetailsPage.tsx";
import { AddBook } from "./pages/AddBookPage.tsx";
import LogOrRegisterPage from "./pages/LogOrRegisterPage.tsx";
import ModifyAccountPage from "./pages/ModifyAccountPage.tsx";

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
		path: "/login-or-register",
		element: <LogOrRegisterPage />,
		errorElement: <PageNotFound />,
	},
	{
		path: "/new-book",
		element: <AddBook />,
		errorElement: <PageNotFound />,
	},
	{
		path: "/homepage",
		element: <HomePage />,
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
	{
		path: "/modify-account",
		element: <ModifyAccountPage />,
		errorElement: <PageNotFound />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
