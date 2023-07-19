import React from "react";
import { useForm } from './use-form';

const FilmAdd = () => {
	const presenter = useForm();

	return (
		<form onSubmit={presenter.handleSubmitAdd}>
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
			<button type="submit">Ajouter</button>
		</form>
	);
};

export default FilmAdd;
