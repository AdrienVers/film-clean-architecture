import { FilmDomainModel } from "../model/film.domain-model";
import { createFilm, getFilms } from "../slices/films.slice";
import { AppDispatch } from "../../../../store/store";

export const addFilm =
	(filmData: FilmDomainModel.FilmInput) => async (dispatch: AppDispatch) => {
		await dispatch(createFilm(filmData));
		dispatch(getFilms());
	};
