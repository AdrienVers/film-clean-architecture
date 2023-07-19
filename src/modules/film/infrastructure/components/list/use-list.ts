import { useEffect, useCallback } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { enterEditMode } from "../../../domain/slices/films.slice";
import { AppDispatch, AppState } from "../../../../../store/store";
import { removeFilm } from "../../../domain/usecases/remove-film.usecase";
import { fetchFilms } from "../../../domain/usecases/fetch-films.usecase";

export const searchSelector = (state: AppState) => state.search.filter;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { films, status } = useSelector((state: AppState) => state.app);
	const filter = useAppSelector(searchSelector);

	useEffect(() => {
		dispatch(fetchFilms());
	}, [dispatch]);

	const handleUpdate = useCallback(
		(id: string) => {
			dispatch(enterEditMode(id));
		},
		[dispatch],
	);

	const handleDelete = useCallback(
		(id: string) => {
			dispatch(removeFilm(id));
		},
		[dispatch],
	);

	return {
		films,
		status,
		filter,
		handleUpdate,
		handleDelete,
	};
};
