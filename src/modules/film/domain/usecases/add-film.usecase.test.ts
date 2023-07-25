import filmsSlice, { createFilm } from "../slices/films.slice";
import { FilmDomainModel } from "../model/film.domain-model";
import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

const initialFilm: FilmDomainModel.Film = {
	id: "1",
	title: "Harry Potter",
	director: "J.K. Rowling",
	year: "2001",
	actors: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
	synopsis: "A fantasy movie",
	category: "owned",
};

const newFilm: FilmDomainModel.FilmInput = {
	title: "Avatar",
	director: "James Cameron",
	year: "2009",
	actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
	synopsis: "A sci-fi movie",
	category: "owned",
};

(global.fetch as any) = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(newFilm),
	}),
);

const dispatch = jest.fn();
const getState = jest.fn();

describe("createFilm", () => {
	it("dispatches the correct actions on successful fetch", async () => {
		await createFilm(newFilm)(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: createFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: createFilm.fulfilled.type }),
		);
	});

	it("dispatches the correct actions on failed fetch", async () => {
		global.fetch = jest.fn(() => Promise.reject({ message: "API error" }));

		await createFilm(newFilm)(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: createFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: createFilm.rejected.type }),
		);
	});

	it("dispatches the correct actions when an instance of Error is thrown", async () => {
		global.fetch = jest.fn(() =>
			Promise.reject(new Error("An instance of Error occurred")),
		);

		await createFilm(newFilm)(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: createFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: createFilm.rejected.type,
				payload: "An instance of Error occurred",
			}),
		);
	});
});

describe("filmsSlice", () => {
	it("sets status to loading when createFilm is pending", () => {
		const action: PayloadAction = {
			type: createFilm.pending.type,
			payload: undefined,
		};
		const newState = filmsSlice(undefined, action);
		expect(newState.status).toEqual("loading");
	});

	it("adds new film and sets status when createFilm is fulfilled", () => {
		const initialState: FilmDomainModel.FilmState = {
			films: [initialFilm],
			status: "idle",
			error: null,
			editFilm: null,
			filter: "",
			category: "owned",
			formMode: false,
			addingMode: false,
			editingMode: false,
		};
		const action: PayloadAction<FilmDomainModel.FilmInput> = {
			type: createFilm.fulfilled.type,
			payload: newFilm,
		};
		const newState = filmsSlice(initialState, action);
		expect(newState.films).toEqual([initialFilm, newFilm]);
		expect(newState.status).toEqual("idle");
	});

	it("sets error and status when createFilm is rejected", () => {
		const testCases = [
			{ error: "Some error message", expected: "Some error message" },
			{ error: "", expected: null },
		];

		testCases.forEach(({ error, expected }) => {
			const action: PayloadAction<unknown, string, unknown, SerializedError> = {
				type: createFilm.rejected.type,
				payload: error,
				meta: null,
				error: { message: error },
			};
			const newState = filmsSlice(undefined, action);
			expect(newState.error).toEqual(expected);
			expect(newState.status).toEqual("failed");
		});
	});
});
