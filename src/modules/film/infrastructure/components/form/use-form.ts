import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../../store/store";
import { FilmDomainModel } from "../../../domain/model/film.domain-model";
import { addFilm } from "../../../domain/usecases/add-film.usecase";
import { modifyFilm } from "../../../domain/usecases/modify-film.usecase";

export const useForm = () => {
	const { editingFilm } = useSelector((state: AppState) => state.app) as {
		editingFilm: FilmDomainModel.Film | null;
	};

	const [filmData, setFilmData] = useState<FilmDomainModel.FilmInput>({
		title: "",
		director: "",
		year: "",
	});

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (editingFilm) {
			setFilmData({
				title: editingFilm?.title || "",
				director: editingFilm?.director || "",
				year: editingFilm?.year || "",
			});
		}
	}, [editingFilm]);

	const getFilmData = (e: ChangeEvent<HTMLInputElement>) => {
		setFilmData({ ...filmData, [e.target.name]: e.target.value });
	};

	const handleSubmitAdd = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addFilm(filmData));
	};

	const handleSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (editingFilm) {
			dispatch(modifyFilm({ id: editingFilm?.id || "", data: filmData }));
		}
	};

	return {
		filmData,
		getFilmData,
		handleSubmitAdd,
		handleSubmitUpdate,
		editingFilm,
	};
};
