import React from "react";
import { useForm } from "./use-form";

const FilmUpdate = () => {
	const presenter = useForm();

	if (!presenter.editingFilm) return null;

	return (
		<form onSubmit={presenter.handleSubmitUpdate}>
			<label>Titre</label>
			<input
				name="title"
				type="text"
				placeholder="Inception"
				value={presenter.filmData.title}
				onChange={presenter.getFilmData}
			/>
			<label>Réalisateur</label>
			<input
				name="director"
				type="text"
				placeholder="Christopher Nolan"
				value={presenter.filmData.director}
				onChange={presenter.getFilmData}
			/>
			<label>Année</label>
			<input
				name="year"
				type="text"
				placeholder="2010"
				value={presenter.filmData.year}
				onChange={presenter.getFilmData}
			/>
			<button type="submit">Mettre à jour</button>
		</form>
	);
};

export default FilmUpdate;
