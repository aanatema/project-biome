import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModifyUserForm } from "./ModifyUserForm";
import { userApi } from "../../../libraries/axios";
import { MemoryRouter } from "react-router";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { beforeEach } from "node:test";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

// Mocks external dependencies
// vi.mock("@/libraries/axios", () => ({
// 	// userApi: {
// 	// 	modify: vi.fn(),
// 	// 	post: vi.fn(),
// 	// },
// }));

vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
	},
}));

const renderWithProviders = (authValue: AuthContextType) => {
	return render(
		<MemoryRouter>
			<AuthContext.Provider value={authValue}>
				<ModifyUserForm />
			</AuthContext.Provider>
		</MemoryRouter>
	);
};

// TESTS
describe("Modify user form works as expected", () => {
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

	it("should render the modify user form", () => {
		renderWithProviders(mockAuthContext);

		const form = screen.getByRole("form");
		expect(form).toBeInTheDocument();
		const updateAccount = screen.getByRole("button", {
			name: /update account/i,
		});
		const deleteAccount = screen.getByRole("button", {
			name: /delete account/i,
		});
		expect(updateAccount).toBeInTheDocument();
		expect(deleteAccount).toBeInTheDocument();
	});

    it("should update user information when all required fields are filled", async () => {
		const user = userEvent.setup();
		const putSpy = vi.spyOn(userApi, "put").mockResolvedValue({ data: {} });

		renderWithProviders(mockAuthContext);

		// Fill in all required input
		const usernameInput = screen.getByPlaceholderText(
			/type your new username/i
		);
		const emailInput = screen.getByPlaceholderText(/exemple@email.com/i);
		const currentPasswordInput =
			screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);

		await user.clear(usernameInput);
		await user.type(usernameInput, "NewUsername");

		await user.clear(emailInput);
		await user.type(emailInput, "newemail@test.com");

		await user.clear(currentPasswordInput);
		await user.type(currentPasswordInput, "currentPass123");

		// SSubmit
		const submitButton = screen.getByRole("button", {
			name: /update account/i,
		});
		await user.click(submitButton);

		// Check api route modify_user has been called with the right values
		await waitFor(() => {
			expect(putSpy).toHaveBeenCalledWith("/modify_user", {
				username: "NewUsername",
				currentPassword: "currentPass123",
				email: "newemail@test.com",
			});
		});

		expect(toast.success).toHaveBeenCalledWith(
			"Account updated successfully!"
		);

		// Check that form reset properly
		await waitFor(() => {
			expect(usernameInput).toHaveValue("");
			expect(emailInput).toHaveValue("");
			expect(currentPasswordInput).toHaveValue("");
		});
    });

    it("should update password when new password field is filled", async () => {
		const user = userEvent.setup();
		const putSpy = vi.spyOn(userApi, "put").mockResolvedValue({ data: {} });

		renderWithProviders(mockAuthContext);

		// Fill all required inputs (NEEDS TO BE CHANGED IN THE FUTURE)
		const usernameInput = screen.getByPlaceholderText(
			/type your new username/i
		);
		const emailInput = screen.getByPlaceholderText(/exemple@email.com/i);
		const currentPasswordInput =
			screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
		const newPasswordInput = screen.getByPlaceholderText(
			/leave empty to keep your current password/i
		);

		await user.type(usernameInput, "NewUsername");
		await user.type(emailInput, "newemail@test.com");
		await user.type(currentPasswordInput, "currentPass123");
		await user.type(newPasswordInput, "newPass123");

		const submitButton = screen.getByRole("button", {
			name: /update account/i,
		});
		await user.click(submitButton);

		// Api call fo modify_user with the right password value check
		await waitFor(() => {
			expect(putSpy).toHaveBeenCalledWith("/modify_user", {
				username: "NewUsername",
				currentPassword: "currentPass123",
				email: "newemail@test.com",
				newPassword: "newPass123",
			});
		});

		expect(toast.success).toHaveBeenCalledWith(
			"Account updated successfully!"
		);
    });
    
    it("should display error toast when API returns 401 (incorrect password)", async () => {
		const user = userEvent.setup();
		const putSpy = vi.spyOn(userApi, "put").mockRejectedValue({
			isAxiosError: true,
			response: { status: 401 },
		});

		renderWithProviders(mockAuthContext);

		const usernameInput = screen.getByPlaceholderText(
			/type your new username/i
		);
		const emailInput = screen.getByPlaceholderText(/exemple@email.com/i);
		const currentPasswordInput =
			screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);

		await user.type(usernameInput, "NewUsername");
		await user.type(emailInput, "newemail@test.com");
		await user.type(currentPasswordInput, "wrongPassword");

		const submitButton = screen.getByRole("button", {
			name: /update account/i,
		});
		await user.click(submitButton);

		await waitFor(() => {
			expect(putSpy).toHaveBeenCalled();
			expect(toast.error).toHaveBeenCalledWith(
				"Incorrect current password"
			);
		});
    });
    
    it("should display error toast when API returns 409 (email already exists)", async () => {
		const user = userEvent.setup();
		const putSpy = vi.spyOn(userApi, "put").mockRejectedValue({
			isAxiosError: true,
			response: { status: 409 },
		});

		renderWithProviders(mockAuthContext);

		const usernameInput = screen.getByPlaceholderText(
			/type your new username/i
		);
		const emailInput = screen.getByPlaceholderText(/exemple@email.com/i);
		const currentPasswordInput =
			screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);

		await user.type(usernameInput, "NewUsername");
		await user.type(emailInput, "existing@test.com");
		await user.type(currentPasswordInput, "currentPass123");

		const submitButton = screen.getByRole("button", {
			name: /update account/i,
		});
		await user.click(submitButton);

		await waitFor(() => {
			expect(putSpy).toHaveBeenCalled();
			expect(toast.error).toHaveBeenCalledWith("Email already exists");
		});
	});
    
});
