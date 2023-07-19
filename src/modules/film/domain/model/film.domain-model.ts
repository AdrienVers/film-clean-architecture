export namespace FilmDomainModel {
	export type Film = {
		id: string;
		title: string;
		director: string;
		year: string;
	};

	export type FilmInput = {
		title: string;
		director: string;
		year: string;
	};

	export type FilmState = {
		films: FilmDomainModel.Film[];
		status: "idle" | "loading" | "failed";
		error: string | null;
		editingFilm: FilmDomainModel.Film | null;
		filter: string;
	};
}
