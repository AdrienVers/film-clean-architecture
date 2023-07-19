import { deleteFilm } from "../slices/films.slice";
import { AppDispatch } from "../../../../store/store";

export const removeFilm = (id: string) => (dispatch: AppDispatch) => {
	dispatch(deleteFilm(id));
};
