import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Route } from "react-router";
import { Routes } from "react-router";

describe("Navbar", () => {
	it("should render on homepage route", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Navbar />
			</MemoryRouter>
		);

        expect(screen.getByText(/homepage/i)).toBeInTheDocument();
    });

    it("should render on add book route", () => {
		render(
			<MemoryRouter initialEntries={["/new-book"]}>
				<Navbar />
			</MemoryRouter>
		);

		expect(screen.getByText(/add a book/i)).toBeInTheDocument();
    });
    
    it("should render on account route", () => {
		render(
			<MemoryRouter initialEntries={["/account"]}>
				<Navbar />
			</MemoryRouter>
		);

		expect(screen.getByText(/account/i)).toBeInTheDocument();
    });
    
    it("should navigate between routes", async () => {
        const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<Navbar />
								<div>Homepage content</div>
							</>
						}
					/>
					<Route
						path='/new-book'
						element={
							<>
								<Navbar />
								<div>Add book page</div>
							</>
						}
					/>
					<Route
						path='/account'
						element={
							<>
								<Navbar />
								<div>Account page</div>
							</>
						}
					/>
				</Routes>
			</MemoryRouter>
		);

		// check user is on homepage
		expect(screen.getByText(/homepage content/i)).toBeInTheDocument();

		// click on "Add a book"
		const addBookLink = screen.getByText(/add a book/i);
		await user.click(addBookLink);

		//check user is on "add a book" page
        expect(screen.getByText(/add book page/i)).toBeInTheDocument();
        const accountLink = screen.getByText(/account/i);
		await user.click(accountLink);

		//check user is on "add a book" page
		expect(screen.getByText(/account page/i)).toBeInTheDocument();
	});


});

