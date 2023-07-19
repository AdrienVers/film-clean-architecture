import { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, AppState } from "../../../../../store/store";
import { searchFilm } from "../../../domain/usecases/search-film.usecase";

export const searchSelector = (state: AppState) => state.search.filter;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useSearch = () => {
	const dispatch = useDispatch<AppDispatch>();
	const filter = useAppSelector(searchSelector);

	const setFilter = useCallback(
		(filterValue: string) => {
			dispatch(searchFilm(filterValue));
		},
		[dispatch],
	);

	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setFilter(e.currentTarget.value);
		},
		[setFilter],
	);

	return {
		filter,
		onChangeHandler,
	};
};
