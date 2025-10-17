import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ConfirmDeletionDialog } from "./ConfirmUserDeletion";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { MemoryRouter } from "react-router";
import { userApi } from "../../../libraries/axios";
import { toast } from "sonner";

// Mocks external dependencies
vi.mock("@/libraries/axios", () => ({
	userApi: {
		delete: vi.fn(),
		post: vi.fn(),
	},
	authApi: {
		post: vi.fn(),
	},
	bookApi: {
		post: vi.fn(),
	},
}));

vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
	},
}));

// Helper to easy component render with its different contexts
const renderWithProviders = (authValue: AuthContextType) => {
	return render(
		<MemoryRouter>
			<AuthContext.Provider value={authValue}>
				<ConfirmDeletionDialog />
			</AuthContext.Provider>
		</MemoryRouter>
	);
};

// TESTS
describe("ConfirmDeletionDialog", () => {
	// Mocking authContext = user connected
	const mockAuthContext: AuthContextType = {
		user: { id: "123", username: "TestUser", email: "test@test.com" },
		loading: false,
		setUser: vi.fn(),
		login: vi.fn(),
		logout: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render the delete account button", () => {
		renderWithProviders(mockAuthContext);

		const deleteButton = screen.getByRole("button", {
			name: /delete account/i,
		});
		expect(deleteButton).toBeInTheDocument();
	});

	it("should open dialog when clicking delete account button", async () => {
		const user = userEvent.setup();
		renderWithProviders(mockAuthContext);

		// Dialog not visible at first
		expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();

		const deleteButton = screen.getByRole("button", {
			name: /delete account/i,
		});
		await user.click(deleteButton);

		// Dialog appears
		expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
		expect(
			screen.getByText(/this action is permanent/i)
		).toBeInTheDocument();
	});

	it("should close dialog when clicking cancel", async () => {
		const user = userEvent.setup();
		renderWithProviders(mockAuthContext);

		// Opens dialog
		const deleteButton = screen.getByRole("button", {
			name: /delete account/i,
		});
		await user.click(deleteButton);

		const cancelButton = screen.getByRole("button", {
			name: /cancel/i,
		});
		await user.click(cancelButton);

		// Dialog should disappear
		await waitFor(() => {
			expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
		});
	});

	it("should delete account successfully when clicking confirm", async () => {
		const user = userEvent.setup();

		// Creating spy on delete method and simulating success
		const deleteSpy = vi
			.spyOn(userApi, "delete")
			.mockResolvedValueOnce({ data: {} } as unknown);

		renderWithProviders(mockAuthContext);

		const deleteButton = screen.getByRole("button", {
			name: /delete account/i,
		});
		await user.click(deleteButton);

		const confirmButton = screen.getByRole("button", {
			name: /confirm/i,
		});
		await user.click(confirmButton);

		// Checks
		await waitFor(() => {
			// Delete api route has been called
			expect(deleteSpy).toHaveBeenCalledWith("/delete_user");

			// Logout function has been called
			expect(mockAuthContext.logout).toHaveBeenCalled();

			// Successful toast appeared
			expect(toast.success).toHaveBeenCalledWith(
				"Account successfully deleted"
			);
		});

		// Clean spy
		deleteSpy.mockRestore();
	});

	it("should handle deletion error and show error toast", async () => {
		const user = userEvent.setup();

		// Creating spy on delete method and simulating error
		const errorMessage = "Network error";
		const deleteSpy = vi
			.spyOn(userApi, "delete")
			.mockRejectedValueOnce(new Error(errorMessage));

		renderWithProviders(mockAuthContext);

		const deleteButton = screen.getByRole("button", {
			name: /delete account/i,
		});
		await user.click(deleteButton);

		const confirmButton = screen.getByRole("button", {
			name: /confirm/i,
		});
		await user.click(confirmButton);

		// Checks
		await waitFor(() => {
			expect(deleteSpy).toHaveBeenCalledWith("/delete_user");

			expect(toast.error).toHaveBeenCalledWith(
				"Fail in account deletion"
			);

			// Logout should NOT been called on error
			expect(mockAuthContext.logout).not.toHaveBeenCalled();
		});

		deleteSpy.mockRestore();
	});

	it("should not delete account if auth context is undefined", async () => {
		const user = userEvent.setup();

		// Spy to simulate
		const deleteSpy = vi
			.spyOn(userApi, "delete")
			.mockResolvedValueOnce({ data: {} } as unknown);
		
		// render component without AuthContext => AuthContext = undefined
		render(
			<MemoryRouter>
				<ConfirmDeletionDialog />
			</MemoryRouter>
		);

		const deleteButton = screen.getByRole("button", {
			name: /delete account/i,
		});
		await user.click(deleteButton);

		const confirmButton = screen.getByRole("button", { name: /confirm/i });
		await user.click(confirmButton);

		// Api is not called
		expect(deleteSpy).not.toHaveBeenCalled();
	});
});