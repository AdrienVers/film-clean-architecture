import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { FilmDomainModel } from "../model/film.domain-model";
import filmsSlice, { deleteFilm } from "../slices/films.slice";

const filmToDelete: FilmDomainModel.Film = {
	id: "1",
	title: "Avatar",
	director: "James Cameron",
	year: "2009",
	actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
	synopsis: "A sci-fi movie",
	category: "owned",
};

const dispatch = jest.fn();
const getState = jest.fn();

describe("deleteFilm", () => {
	beforeEach(() => {
		(global.fetch as any) = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({}),
			}),
		);
	});

	it("dispatches the correct actions on successful delete", async () => {
		await deleteFilm(filmToDelete.id)(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: deleteFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: deleteFilm.fulfilled.type }),
		);
	});

	it("dispatches the correct actions on failed delete", async () => {
		global.fetch = jest.fn(() => Promise.reject("API error"));

		await deleteFilm(filmToDelete.id)(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: deleteFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: deleteFilm.rejected.type }),
		);
	});

	it("dispatches the correct actions when an instance of Error is thrown", async () => {
		global.fetch = jest.fn(() =>
			Promise.reject(new Error("An instance of Error occurred")),
		);

		await deleteFilm(filmToDelete.id)(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: deleteFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: deleteFilm.rejected.type,
				payload: "An instance of Error occurred",
			}),
		);
	});
});

describe("filmsSlice", () => {
	const initialState: FilmDomainModel.FilmState = {
		films: [filmToDelete],
		status: "idle",
		error: null,
		editFilm: null,
		filter: "",
		category: "owned",
		formMode: false,
		addingMode: false,
		editingMode: false,
	};

	it("sets status to loading when deleteFilm is pending", () => {
		const action: PayloadAction = {
			type: deleteFilm.pending.type,
			payload: undefined,
		};
		const newState = filmsSlice(initialState, action);
		expect(newState.status).toEqual("loading");
	});

	it("removes film and sets status when deleteFilm is fulfilled", () => {
		const action: PayloadAction<string, string, { arg: string }> = {
			type: deleteFilm.fulfilled.type,
			payload: filmToDelete.id,
			meta: {
				arg: filmToDelete.id,
			},
		};
		const newState = filmsSlice(initialState, action);
		expect(newState.films).toEqual([]);
		expect(newState.status).toEqual("idle");
	});

	it("sets error and status when deleteFilm is rejected", () => {
		const testCases = [
			{ error: "Some error message", expected: "Some error message" },
			{ error: "", expected: null },
		];

		testCases.forEach(({ error, expected }) => {
			const action: PayloadAction<unknown, string, unknown, SerializedError> = {
				type: deleteFilm.rejected.type,
				payload: error,
				meta: null,
				error: { message: error },
			};
			const newState = filmsSlice(initialState, action);
			expect(newState.error).toEqual(expected);
			expect(newState.status).toEqual("failed");
		});
	});
});
