import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FilmForm from "./FilmForm";
import React from "react";
import { Provider } from "react-redux";
import { createTestStore } from "../../../../../store/tests";
import "@testing-library/jest-dom";

jest.mock("nanoid", () => {
	return {
		nanoid: jest.fn().mockReturnValue("fakeId"),
	};
});

describe("FilmForm layout test", () => {
	const store = createTestStore();

	it("Initially, only the 'Ajouter un film' button is present", () => {
		render(
			<Provider store={store}>
				<FilmForm />
			</Provider>,
		);

		const addButton = screen.getByRole("button", { name: /Ajouter un film/i });
		const updateButton = screen.getByText("Modifier un film");

		expect(addButton).toHaveStyle({
			display: "flex",
		});
		expect(updateButton).toHaveStyle({
			display: "none",
		});
	});

	it("When clicking on 'Ajouter un film', the 'Modifier un film' button appears in grey", () => {
		render(
			<Provider store={store}>
				<FilmForm />
			</Provider>,
		);

		const addButton = screen.getByRole("button", { name: /Ajouter un film/i });
		const updateButton = screen.getByText("Modifier un film");

		fireEvent.click(addButton);

		expect(updateButton).toHaveStyle({
			display: "flex",
			color: "rgb(100, 100, 100)",
		});
	});

	it("In 'Ajouter un film' mode, it is possible to close the form by clicking on the close button, and we should find the initial state.", () => {
		render(
			<Provider store={store}>
				<FilmForm />
			</Provider>,
		);

		const addButton = screen.getByRole("button", { name: /Ajouter un film/i });
		const updateButton = screen.getByText("Modifier un film");
		const closeButton = screen.getByRole("button", { name: /close/i });

		fireEvent.click(screen.getByText("Ajouter un film"));
		fireEvent.click(closeButton);

		expect(addButton).toBeInTheDocument();
		expect(updateButton).toHaveStyle({
			display: "none",
		});
	});
});
