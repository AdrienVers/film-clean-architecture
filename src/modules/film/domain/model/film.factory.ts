import { FilmDomainModel } from "./film.domain-model";

export class FilmFactory {
	static create(data?: Partial<FilmDomainModel.Film>) {
		return {
			id: "",
			title: "",
			director: "",
			year: "",
			actors: ["", "", ""],
			synopsis: "",
			...data,
		};
	}
}
