import PageNotFound from "./pages/PageNotFound.tsx";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AccountPage from "./pages/AccountPage.tsx";
import { AddBook } from "./pages/AddBookPage.tsx";
import LogOrRegisterPage from "./pages/LogOrRegisterPage.tsx";
import ModifyAccountPage from "./pages/ModifyAccountPage.tsx";
import BookReviewsPage from "./pages/BookReviewsPage.tsx";
import NotConnectedPage from "./pages/NotConnectedPage.tsx";

const router = createBrowserRouter([
	{ path: "/", element: <HomePage />, errorElement: <PageNotFound /> },
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
		path: "/not-connected",
		element: <NotConnectedPage />,
		errorElement: <PageNotFound />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
