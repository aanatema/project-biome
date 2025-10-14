import { render, screen, fireEvent } from "@testing-library/react";
import DeleteReview from "./DeleteReviewButton";
import { beforeEach, describe, expect, vi, it } from "vitest";

// TODO test for deletion (lots of issues during first try)

// render utils
function setup() {
	const onReviewDeleted = vi.fn();
	render(
		<DeleteReview
			reviewId='123'
			onReviewDeleted={onReviewDeleted}
		/>
	);
	return { onReviewDeleted };
}

// TESTS

describe("Delete review", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("displays trash icon button and modal is closed", () => {
		setup();
		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
	});

	it("opens modal when clicking on the trash icon", () => {
		setup();
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
	});

	it("closes modal when clicking on cancel button", () => {
		setup();
		fireEvent.click(screen.getByRole("button"));
		const cancelButton = screen.getByText(/cancel/i);
		fireEvent.click(cancelButton);
		expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
	});
});
