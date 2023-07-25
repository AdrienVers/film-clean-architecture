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
	editFilm: null,
	filter: "",
	category: "owned",
	formMode: false,
	addingMode: false,
	editingMode: false,
};

export const getFilms = createAsyncThunk(
	"films/getFilms",
	async (_, thunkApi) => {
		try {
			const response = await fetch(`http://localhost:5000/films`);
			const result: FilmDomainModel.Film[] = await response.json();
			console.log(result);
			return result;
		} catch (error: any) {
			if (error instanceof Error) {
				return thunkApi.rejectWithValue(error.message);
			}
			return thunkApi.rejectWithValue("An unknown error occurred.");
		}
	},
);

export const deleteFilm = createAsyncThunk(
	"films/deleteFilm",
	async (id: string, thunkApi) => {
		try {
			const response = await fetch(`http://localhost:5000/films/${id}`, {
				method: "DELETE",
			});
			const result = await response.json();
			console.log(result);
			return result;
		} catch (error: any) {
			if (error instanceof Error) {
				return thunkApi.rejectWithValue(error.message);
			}
			return thunkApi.rejectWithValue("An unknown error occurred.");
		}
	},
);

export const createFilm = createAsyncThunk(
	"films/createFilm",
	async (data: FilmDomainModel.FilmInput, thunkApi) => {
		try {
			const response = await fetch("http://localhost:5000/films", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const result = await response.json();
			return result;
		} catch (error: any) {
			if (error instanceof Error) {
				return thunkApi.rejectWithValue(error.message);
			}
			return thunkApi.rejectWithValue("An unknown error occurred.");
		}
	},
);

export const updateFilm = createAsyncThunk(
	"films/updateFilm",
	async (
		updatedFilm: { id: string; data: FilmDomainModel.FilmInput },
		thunkApi,
	) => {
		try {
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
			const result = await response.json();
			return result;
		} catch (error: any) {
			if (error instanceof Error) {
				return thunkApi.rejectWithValue(error.message);
			}
			return thunkApi.rejectWithValue("An unknown error occurred.");
		}
	},
);

export const filmsSlice = createSlice({
	name: "film",
	initialState,
	reducers: {
		enterFormMode: (state) => {
			state.formMode = true;
		},
		exitFormMode: (state) => {
			state.formMode = false;
		},
		enterAddingMode: (state) => {
			state.addingMode = true;
		},
		exitAddingMode: (state) => {
			state.addingMode = false;
		},
		enterEditingMode: (state) => {
			state.editingMode = true;
		},
		exitEditingMode: (state) => {
			state.editingMode = false;
		},
		enterEditMode: (state, action: PayloadAction<string>) => {
			const film = state.films.find((item) => item.id === action.payload);
			if (film) {
				state.editFilm = film;
			}
		},
		exitEditMode: (state) => {
			state.editFilm = null;
		},
		setCategory: (
			state,
			action: PayloadAction<"owned" | "desired" | "televised">,
		) => {
			state.category = action.payload;
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
			.addCase(
				createFilm.fulfilled,
				(state, action: PayloadAction<FilmDomainModel.Film>) => {
					state.status = "idle";
					state.films.push(action.payload);
				},
			)
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
export const {
	enterEditMode,
	exitEditMode,
	enterFormMode,
	exitFormMode,
	enterAddingMode,
	exitAddingMode,
	enterEditingMode,
	exitEditingMode,
	setCategory,
} = filmsSlice.actions;
