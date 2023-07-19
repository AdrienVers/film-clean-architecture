import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
	type SerializedError,
} from "@reduxjs/toolkit";
import { FilmDomainModel } from "../model/film.domain-model";

const initialState: FilmDomainModel.FilmState = {
	films: [],
	status: "idle",
	error: null,
	editingFilm: null,
	filter: "",
};

export const getFilms = createAsyncThunk(
	"getFilms",
	async (args, { rejectWithValue }) => {
		const response = await fetch("http://localhost:5000/films");

		try {
			const result: FilmDomainModel.Film[] = await response.json();
			console.log(result);
			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue("An unknown error occurred.");
		}
	},
);

export const deleteFilm = createAsyncThunk(
	"deleteFilm",
	async (id: string, { rejectWithValue }) => {
		const response = await fetch(
			// `https://64aec8c6c85640541d4db3ac.mockapi.io/crud/${id}`,
			`http://localhost:5000/films/${id}`,
			{ method: "DELETE" },
		);

		try {
			const result = await response.json();
			console.log(result);
			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue("An unknown error occurred.");
		}
	},
);

export const createFilm = createAsyncThunk(
	"createFilm",
	async (data: FilmDomainModel.FilmInput, { rejectWithValue }) => {
		const response = await fetch(
			//"https://64aec8c6c85640541d4db3ac.mockapi.io/crud",
			"http://localhost:5000/films",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);

		try {
			const result = await response.json();
			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue("An unknown error occurred.");
		}
	},
);

export const updateFilm = createAsyncThunk(
	"updateFilm",
	async (
		updatedFilm: { id: string; data: FilmDomainModel.FilmInput },
		{ rejectWithValue },
	) => {
		const response = await fetch(
			`http://localhost:5000/films/${updatedFilm.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedFilm.data),
			},
		);

		try {
			const result = await response.json();
			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue("An unknown error occurred.");
		}
	},
);

export const filmsSlice = createSlice({
	name: "film",
	initialState,
	reducers: {
		enterEditMode: (state, action: PayloadAction<string>) => {
			const film = state.films.find((item) => item.id === action.payload);
			if (film) {
				state.editingFilm = film;
			}
		},
		exitEditMode: (state) => {
			state.editingFilm = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFilms.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				getFilms.fulfilled,
				(state, action: PayloadAction<FilmDomainModel.Film[]>) => {
					state.status = "idle";
					state.films = action.payload;
				},
			)
			.addCase(
				getFilms.rejected,
				(
					state,
					action: PayloadAction<unknown, string, unknown, SerializedError>,
				) => {
					state.status = "failed";
					state.error = action.error.message || null;
				},
			)
			.addCase(deleteFilm.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteFilm.fulfilled, (state, action) => {
				state.status = "idle";
				const id = action.meta.arg;
				state.films = state.films.filter((item) => item.id !== id);
			})
			.addCase(deleteFilm.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			})
			.addCase(createFilm.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createFilm.fulfilled, (state, action) => {
				state.status = "idle";
				state.films.push(action.payload);
			})
			.addCase(createFilm.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			})
			.addCase(updateFilm.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateFilm.fulfilled, (state, action) => {
				state.status = "idle";
				const updatedFilm = action.payload;
				const filmIndex = state.films.findIndex(
					(film) => film.id === updatedFilm.id,
				);
				if (filmIndex !== -1) {
					state.films[filmIndex] = updatedFilm;
				}
			})
			.addCase(updateFilm.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			});
	},
});

export default filmsSlice.reducer;
export const { enterEditMode, exitEditMode } = filmsSlice.actions;
