import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { FilmDomainModel } from "../model/film.domain-model";
import filmsSlice, { getFilms } from "../slices/films.slice";

const films: FilmDomainModel.Film[] = [
	{
		id: "1",
		title: "Avatar",
		director: "James Cameron",
		year: "2009",
		actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
		synopsis: "A sci-fi movie",
		category: "owned",
	},
];

(global.fetch as any) = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(films),
	}),
);

const dispatch = jest.fn();
const getState = jest.fn();

describe("getFilms", () => {
	it("dispatches the correct actions on successful fetch", async () => {
		await getFilms()(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: getFilms.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: getFilms.fulfilled.type }),
		);
	});

	it("dispatches the correct actions on failed fetch", async () => {
		global.fetch = jest.fn(() => Promise.reject(new Error("API error")));

		await getFilms()(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: getFilms.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: getFilms.rejected.type }),
		);
	});

	it("dispatches the correct actions when an unknown error occurs", async () => {
		global.fetch = jest.fn(() => Promise.reject("Unknown error"));

		await getFilms()(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: getFilms.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: getFilms.rejected.type,
				payload: "An unknown error occurred.",
			}),
		);
	});
});

describe("filmsSlice", () => {
	it("sets status to loading when getFilms is pending", () => {
		const action: PayloadAction = {
			type: getFilms.pending.type,
			payload: undefined,
		};
		const newState = filmsSlice(undefined, action);
		expect(newState.status).toEqual("loading");
	});

	it("sets films and status when getFilms is fulfilled", () => {
		const action: PayloadAction<FilmDomainModel.Film[]> = {
			type: getFilms.fulfilled.type,
			payload: films,
		};
		const newState = filmsSlice(undefined, action);
		expect(newState.films).toEqual(films);
		expect(newState.status).toEqual("idle");
	});

	it("sets error and status when getFilms is rejected", () => {
		const testCases = [
			{ error: "Some error message", expected: "Some error message" },
			{ error: "", expected: null },
		];

		testCases.forEach(({ error, expected }) => {
			const action: PayloadAction<unknown, string, unknown, SerializedError> = {
				type: getFilms.rejected.type,
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
