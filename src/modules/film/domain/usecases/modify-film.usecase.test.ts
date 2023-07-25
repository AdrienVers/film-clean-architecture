import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { FilmDomainModel } from "../model/film.domain-model";
import filmsSlice, {
	updateFilm,
	enterEditMode,
	exitEditMode,
	enterFormMode,
	exitFormMode,
	enterAddingMode,
	exitAddingMode,
	enterEditingMode,
	exitEditingMode,
} from "../slices/films.slice";

const initialFilm: FilmDomainModel.Film = {
	id: "1",
	title: "Avatar",
	director: "James Cameron",
	year: "2009",
	actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
	synopsis: "A sci-fi movie",
	category: "owned",
};

const updatedFilm = {
	title: "Avatar 2",
	director: "Jamy",
	year: "2022",
	actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
	synopsis: "A sci-fi movie",
	category: "owned",
};

const dispatch = jest.fn();
const getState = jest.fn();

describe("updateFilm", () => {
	beforeEach(() => {
		(global.fetch as any) = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(updatedFilm),
			}),
		);
	});

	it("dispatches the correct actions on successful update", async () => {
		await updateFilm({ id: initialFilm.id, data: updatedFilm })(
			dispatch,
			getState,
			{},
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: updateFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: updateFilm.fulfilled.type }),
		);
	});

	it("dispatches the correct actions on failed update", async () => {
		global.fetch = jest.fn(() => Promise.reject("API error"));

		await updateFilm({ id: initialFilm.id, data: updatedFilm })(
			dispatch,
			getState,
			{},
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: updateFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: updateFilm.rejected.type }),
		);
	});

	it("dispatches the correct actions when an instance of Error is thrown", async () => {
		global.fetch = jest.fn(() =>
			Promise.reject(new Error("An instance of Error occurred")),
		);

		await updateFilm({ id: initialFilm.id, data: updatedFilm })(
			dispatch,
			getState,
			{},
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: updateFilm.pending.type }),
		);

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: updateFilm.rejected.type,
				payload: "An instance of Error occurred",
			}),
		);
	});
});

describe("filmsSlice", () => {
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

	it("sets status to loading when updateFilm is pending", () => {
		const action: PayloadAction = {
			type: updateFilm.pending.type,
			payload: undefined,
		};
		const newState = filmsSlice(initialState, action);
		expect(newState.status).toEqual("loading");
	});

	it("updates film and sets status when updateFilm is fulfilled", () => {
		const updatedFilm = { ...initialFilm, title: "New Avatar" };
		const action: PayloadAction<FilmDomainModel.Film> = {
			type: updateFilm.fulfilled.type,
			payload: updatedFilm,
		};
		const newState = filmsSlice(initialState, action);
		expect(newState.films[0]).toEqual(updatedFilm);
		expect(newState.status).toEqual("idle");
	});

	it("sets error and status when updateFilm is rejected", () => {
		const testCases = [
			{ error: "Some error message", expected: "Some error message" },
			{ error: "", expected: null },
		];

		testCases.forEach(({ error, expected }) => {
			const action: PayloadAction<unknown, string, unknown, SerializedError> = {
				type: updateFilm.rejected.type,
				payload: error,
				meta: null,
				error: { message: error },
			};
			const newState = filmsSlice(initialState, action);
			expect(newState.error).toEqual(expected);
			expect(newState.status).toEqual("failed");
		});
	});

	it("sets editFilm when enterEditMode is called", () => {
		const filmIdToEdit = "1";
		const action: PayloadAction<string> = {
			type: enterEditMode.type,
			payload: filmIdToEdit,
		};
		const newState = filmsSlice(initialState, action);
		expect(newState.editFilm).toEqual(
			newState.films.find((film) => film.id === filmIdToEdit),
		);
	});

	it("resets editFilm when exitEditMode is called", () => {
		const editingState: FilmDomainModel.FilmState = {
			...initialState,
			editFilm: {
				id: "1",
				title: "Avatar",
				director: "James Cameron",
				year: "2009",
				actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
				synopsis: "A sci-fi movie",
				category: "owned",
			},
		};

		const action: PayloadAction = {
			type: exitEditMode.type,
			payload: undefined,
		};
		const newState = filmsSlice(editingState, action);
		expect(newState.editFilm).toBeNull();
	});

	it("should enter form mode", () => {
		const action = enterFormMode();
		const newState = filmsSlice(initialState, action);
		expect(newState.formMode).toBe(true);
	});

	it("should exit form mode", () => {
		const action = exitFormMode();
		const newState = filmsSlice(initialState, action);
		expect(newState.formMode).toBe(false);
	});

	it("should enter adding mode", () => {
		const action = enterAddingMode();
		const newState = filmsSlice(initialState, action);
		expect(newState.addingMode).toBe(true);
	});

	it("should exit adding mode", () => {
		const action = exitAddingMode();
		const newState = filmsSlice(initialState, action);
		expect(newState.addingMode).toBe(false);
	});

	it("should enter editing mode", () => {
		const action = enterEditingMode();
		const newState = filmsSlice(initialState, action);
		expect(newState.editingMode).toBe(true);
	});

	it("should exit editing mode", () => {
		const action = exitEditingMode();
		const newState = filmsSlice(initialState, action);
		expect(newState.editingMode).toBe(false);
	});
});
