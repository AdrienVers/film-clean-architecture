import React from "react";
import FilmAdd from "./FilmAdd";
import FilmUpdate from "./FilmUpdate";
import { useForm } from "./use-form";

const FilmForm = () => {
	const presenter = useForm();

	return presenter.editingFilm ? <FilmUpdate /> : <FilmAdd />;
};

export default FilmForm;
