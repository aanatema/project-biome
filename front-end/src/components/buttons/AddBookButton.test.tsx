import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AddBookButton from "./AddBookButton";

describe('Add book button', () => {
	it('renders correctly', () => {
		render(<AddBookButton />);
		expect(screen.getByText("Add a book")).toBeInTheDocument();
	})
	it('has the corresponding link to new-book', () => {
		render(<AddBookButton />);
		const link = screen.getByRole("link", { name: /add a book/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/new-book");
	})
})