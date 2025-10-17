import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserBooks from "./UserBooks";
import { bookApi } from "../../../libraries/axios";
import { MemoryRouter } from "react-router";
import { toast } from "sonner";
import userEvent from "@testing-library/user-event";

// Mocks
vi.mock("@/libraries/axios", () => ({
	bookApi: {
		get: vi.fn(),
	},
}));

vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
	},
}));

vi.mock("../../../components/buttons/AddBookButton", () => ({
	default: () => <button>Add Book</button>,
}));

vi.mock("../../../components/buttons/PaginationButton", () => ({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	PaginationButtons: ({ currentPage, totalPages, onPageChange }: any) => (
		<div>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}>
				Previous
			</button>
			<span>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	),
}));

vi.mock("@/components/bookComponents/BookCard", () => ({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: ({ id, title, author }: any) => (
		<div data-testid={`book-card-${id}`}>
			<h3>{title}</h3>
			<p>{author}</p>
		</div>
	),
}));

const renderWithRouter = () => {
	return render(
		<MemoryRouter>
			<UserBooks />
		</MemoryRouter>
	);
};

describe("User books component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

    it("should display loading state while fetching books", () => {
		vi.spyOn(bookApi, "get").mockImplementation(
			() => new Promise(() => {}) // Never solved promise to induce loading
		);

		renderWithRouter();

		expect(screen.getByText(/your books are loading/i)).toBeInTheDocument();
    });
    
    it("should display empty state when user has no books", async () => {
		vi.spyOn(bookApi, "get").mockResolvedValue({
			data: { books: [], totalPages: 0 },
		});

		renderWithRouter();

		await waitFor(() => {
			expect(
				screen.getByText(/your library looks empty/i)
			).toBeInTheDocument();
		});

		expect(
			screen.getByText(/add some books to change that/i)
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /add book/i })
		).toBeInTheDocument();
	});
    
    it("should display books when API returns data", async () => {
		const mockBooks = [
			{ id: "1", isbn: "123", title: "Book One", author: "Author One" },
			{ id: "2", isbn: "456", title: "Book Two", author: "Author Two" },
			{
				id: "3",
				isbn: "789",
				title: "Book Three",
				author: "Author Three",
			},
		];

		vi.spyOn(bookApi, "get").mockResolvedValue({
			data: { books: mockBooks, totalPages: 1 },
		});

		renderWithRouter();

		await waitFor(() => {
			expect(screen.getByText("Book One")).toBeInTheDocument();
		});

		expect(screen.getByText("Book Two")).toBeInTheDocument();
		expect(screen.getByText("Book Three")).toBeInTheDocument();
		expect(screen.getByText("Author One")).toBeInTheDocument();
		expect(screen.getByText("Author Two")).toBeInTheDocument();
		expect(screen.getByText("Author Three")).toBeInTheDocument();
    });

    it("should display error toast when API call fails", async () => {
		const getSpy = vi
			.spyOn(bookApi, "get")
			.mockRejectedValue(new Error("Network error"));

		renderWithRouter();

		await waitFor(() => {
			expect(getSpy).toHaveBeenCalledWith("/user_books?page=1&limit=15");
			expect(toast.error).toHaveBeenCalledWith(
				"Impossible to retrieve books, please try again later"
			);
		});
    });
    
    it("should display pagination and fetch new page when clicking next", async () => {
		const user = userEvent.setup();

		const mockBooksPage1 = [
			{ id: "1", isbn: "123", title: "Book One", author: "Author One" },
		];

		const mockBooksPage2 = [
			{ id: "2", isbn: "456", title: "Book Two", author: "Author Two" },
		];

		const getSpy = vi
			.spyOn(bookApi, "get")
			.mockResolvedValueOnce({
				data: { books: mockBooksPage1, totalPages: 2 },
			})
			.mockResolvedValueOnce({
				data: { books: mockBooksPage2, totalPages: 2 },
			});

		renderWithRouter();

		// Wait for first page to load
		await waitFor(() => {
			expect(screen.getByText("Book One")).toBeInTheDocument();
		});

		expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
		expect(getSpy).toHaveBeenCalledWith("/user_books?page=1&limit=15");

		// Go to next page
		const nextButton = screen.getByRole("button", { name: /next/i });
		await user.click(nextButton);

		// Check page 2 has loaded
		await waitFor(() => {
			expect(getSpy).toHaveBeenCalledWith("/user_books?page=2&limit=15");
			expect(screen.getByText("Book Two")).toBeInTheDocument();
		});

		expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
	});

});
