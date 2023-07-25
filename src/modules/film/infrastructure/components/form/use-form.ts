import { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../../store/store";
import { FilmDomainModel } from "../../../domain/model/film.domain-model";
import { addFilm } from "../../../domain/usecases/add-film.usecase";
import { modifyFilm } from "../../../domain/usecases/modify-film.usecase";
import {
	exitEditMode,
	enterFormMode,
	exitFormMode,
	enterAddingMode,
	exitAddingMode,
	enterEditingMode,
	exitEditingMode,
} from "../../../domain/slices/films.slice";
import { fetchFilms } from "../../../domain/usecases/fetch-films.usecase";

export function useForm() {
	const { editFilm } = useSelector((state: AppState) => state.app) as {
		editFilm: FilmDomainModel.Film | null;
	};

	const { formMode } = useSelector((state: AppState) => state.app) as {
		formMode: boolean;
	};

	const { addingMode } = useSelector((state: AppState) => state.app) as {
		addingMode: boolean;
	};

	const { editingMode } = useSelector((state: AppState) => state.app) as {
		editingMode: boolean;
	};

	const { category } = useSelector((state: AppState) => state.app) as {
		category: "owned" | "desired" | "televised";
	};

	const [filmData, setFilmData] = useState<FilmDomainModel.FilmInput>({
		title: "",
		director: "",
		year: "",
		actors: [],
		synopsis: "",
		category: category,
	});

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (editFilm) {
			setFilmData({
				title: editFilm?.title || "",
				director: editFilm?.director || "",
				year: editFilm?.year || "",
				actors: editFilm?.actors || [],
				synopsis: editFilm?.synopsis || "",
				category: editFilm?.category || "owned",
			});
		}
	}, [editFilm]);

	useEffect(() => {
		setFilmData((prevData) => ({
			...prevData,
			category: category,
		}));
	}, [category]);

	function getFilmData(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		if (e.target.name.startsWith("actor-")) {
			const index = parseInt(e.target.name.split("-")[1]);
			const newActors = [...filmData.actors];
			newActors[index] = e.target.value;
			setFilmData({ ...filmData, actors: newActors });
		} else {
			setFilmData({ ...filmData, [e.target.name]: e.target.value });
		}
	}

	function handleOpenFormClick() {
		dispatch(enterFormMode());
	}

	function handleCloseFormClick() {
		dispatch(exitFormMode());
		setFilmData({
			title: "",
			director: "",
			year: "",
			actors: [],
			synopsis: "",
			category: category,
		});
	}

	function handleOpenAddClick() {
		dispatch(enterAddingMode());
		dispatch(exitEditMode());
	}

	function handleCloseAddClick() {
		dispatch(exitAddingMode());
	}

	function handleOpenEditClick() {
		dispatch(enterEditingMode());
		dispatch(exitAddingMode());
	}

	function handleCloseEditClick() {
		dispatch(exitEditingMode());
	}

	function handleSubmitAdd(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(addFilm(filmData)).then(() => {
			dispatch(fetchFilms());
			setFilmData({
				title: "",
				director: "",
				year: "",
				actors: [],
				synopsis: "",
				category: category,
			});
		});
		handleCloseFormClick();
		handleCloseAddClick();
	}

	function handleSubmitUpdate(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (editFilm) {
			dispatch(modifyFilm({ id: editFilm?.id || "", data: filmData }));
			setFilmData({
				title: "",
				director: "",
				year: "",
				actors: [],
				synopsis: "",
				category: category,
			});
		}
		handleCloseFormClick();
		handleCloseEditClick();
	}

	function handleExitEditMode() {
		setFilmData({
			title: "",
			director: "",
			year: "",
			actors: [],
			synopsis: "",
			category: category,
		});
		dispatch(exitEditMode());
	}

	function isSubmitable() {
		return false;
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (editFilm) {
			handleSubmitUpdate(e);
		} else {
			handleSubmitAdd(e);
		}
	}

	return {
		filmData,
		getFilmData,
		handleExitEditMode,
		editFilm,
		handleSubmitAdd,
		handleSubmitUpdate,
		isSubmitable,
		formMode,
		handleOpenFormClick,
		handleCloseFormClick,
		addingMode,
		handleOpenAddClick,
		handleCloseAddClick,
		editingMode,
		handleOpenEditClick,
		handleCloseEditClick,
		handleSubmit,
	};
}
