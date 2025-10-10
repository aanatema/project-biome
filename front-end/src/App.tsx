import PageNotFound from "./pages/PageNotFound.tsx";
import HomePage from "./pages/homepage/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AddBook } from "./pages/addBook/AddBookPage.tsx";
import LogOrRegisterPage from "./pages/connection/LogOrRegisterPage.tsx";
import BookReviewsPage from "./pages/specificBookReviews/BookReviewsPage.tsx";
import LoggedOutPage from "./pages/connection/LoggedOutPage.tsx";
import AccountDeletedPage from "./pages/account/AccountDeletedPage.tsx";
import LoginForm from "./pages/connection/components/LoginForm.tsx";
import ResetPassword from "./components/passwordComponents/ResetPassword.tsx";
import ModifyAccountPage from "./pages/account/ModifyAccountPage.tsx";
import AccountPage from "./pages/account/AccountPage.tsx";

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
	{
		path: "/reset-password",
		element: <ResetPassword />,
		errorElement: <PageNotFound />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
