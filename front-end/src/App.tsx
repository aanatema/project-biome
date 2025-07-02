import PageNotFound from "./pages/PageNotFound.tsx";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AccountPage from "./pages/AccountPage.tsx";
import { AddBook } from "./pages/AddBookPage.tsx";
import LogOrRegisterPage from "./pages/LogOrRegisterPage.tsx";
import ModifyAccountPage from "./pages/ModifyAccountPage.tsx";
import BookReviewsPage from "./pages/BookReviewsPage.tsx";
import LoggedOutPage from "./pages/LoggedOutPage.tsx";
import AccountDeletedPage from "./pages/AccountDeletedPage.tsx";
import LoginForm from "./forms/LoginForm.tsx";

const router = createBrowserRouter([
	{ path: "/", element: <HomePage />, errorElement: <PageNotFound /> },
	{
		path: "/login-or-register",
		element: <LogOrRegisterPage />,
		errorElement: <PageNotFound />,
	},
	{
		path: "/login",
		element: <LoginForm />,
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
		path: "/books/:bookId/reviews",
		element: <BookReviewsPage />,
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
	{
		path: "/disconnected",
		element: <LoggedOutPage />,
		errorElement: <PageNotFound />,
	},
	{
		path: "/account-deleted",
		element: <AccountDeletedPage />,
		errorElement: <PageNotFound />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
