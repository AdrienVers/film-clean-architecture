import { getFilms } from "../slices/films.slice";
import { AppDispatch } from "../../../../store/store";

export const fetchFilms = () => (dispatch: AppDispatch) => {
    dispatch(getFilms());
};
