import { searchActions } from "../slices/search.slice";
import { AppDispatch } from "../../../../store/store";

export const searchFilm = (filter: string) => (dispatch: AppDispatch) => {
	dispatch(searchActions.setFilter(filter));
};
