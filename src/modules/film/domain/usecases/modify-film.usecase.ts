import { FilmDomainModel } from "../model/film.domain-model";
import { updateFilm, exitEditMode } from "../slices/films.slice";
import { AppDispatch } from "../../../../store/store";

export const modifyFilm =
	(film: { id: string; data: FilmDomainModel.FilmInput }) =>
	async (dispatch: AppDispatch) => {
		await dispatch(updateFilm(film));
		dispatch(exitEditMode());
	};
