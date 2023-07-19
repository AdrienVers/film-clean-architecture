import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmsSlice from "../modules/film/domain/slices/films.slice";
import searchSlice from "../modules/film/domain/slices/search.slice";
import { useDispatch } from "react-redux";
import { Dependencies } from "./dependencies";

const reducers = combineReducers({
	app: filmsSlice,
	search: searchSlice,
});

export const createStore = (config: {
	initialState?: AppState;
	dependencies: Dependencies;
}) => {
	const store = configureStore({
		preloadedState: config?.initialState,
		reducer: reducers,
		devTools: true,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				thunk: {
					extraArgument: config.dependencies,
				},
			});
		},
	});

	return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppGetState = AppStore["getState"];
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();