import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { ProfileButton } from "./ProfileSettings";
import { beforeEach } from "node:test";
import userEvent from "@testing-library/user-event";

const renderWithProviders = (
	authValue: AuthContextType,
	initialRoute = "/"
) => {
	return render(
		<MemoryRouter initialEntries={[initialRoute]}>
			<AuthContext.Provider value={authValue}>
				<Routes>
					<Route
						path='/'
						element={<ProfileButton />}
					/>
					<Route
						path='/modify-account'
						element={<div>Modify Account Page</div>}
					/>
					<Route
						path='/disconnected'
						element={<div>Disconnected Page</div>}
					/>
				</Routes>
			</AuthContext.Provider>
		</MemoryRouter>
	);
};

describe("Profile button setting", () => {
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

	it("should render the button and its options correctly", async () => {
		renderWithProviders(mockAuthContext);
		const user = userEvent.setup();

		const profileButton = screen.getByRole("button", { name: /profile/i });
		expect(profileButton).toBeInTheDocument();

		await user.click(profileButton);
		const updateProfileItem = screen.getByRole("menuitem", {
			name: /update profile/i,
		});
		const logoutItem = screen.getByRole("menuitem", {
			name: /logout/i,
		});
		expect(updateProfileItem).toBeInTheDocument();
		expect(logoutItem).toBeInTheDocument();
	});

	it("should navigate to modify-account page when clicking on Update profile", async () => {
		renderWithProviders(mockAuthContext);
		const user = userEvent.setup();

		const profileButton = screen.getByRole("button", { name: /profile/i });
		await user.click(profileButton);

		const updateProfileItem = screen.getByRole("menuitem", {
			name: /update profile/i,
		});
		await user.click(updateProfileItem);

		expect(screen.getByText("Modify Account Page")).toBeInTheDocument();
    });
    
    it("should navigate to disconnected page and call logout when clicking on Logout", async () => {
		renderWithProviders(mockAuthContext);
		const user = userEvent.setup();

		const profileButton = screen.getByRole("button", { name: /profile/i });
		await user.click(profileButton);

		const logoutItem = screen.getByRole("menuitem", {
			name: /logout/i,
		});
		await user.click(logoutItem);

		expect(mockAuthContext.logout).toHaveBeenCalledTimes(1);
		expect(screen.getByText("Disconnected Page")).toBeInTheDocument();
	});
});
