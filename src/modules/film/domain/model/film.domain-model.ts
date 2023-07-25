export namespace FilmDomainModel {
	export type Film = {
		id: string;
		title: string;
		director: string;
		year: string;
		actors: string[];
		synopsis: string;
		category: string;
	};

	export type FilmInput = {
		title: string;
		director: string;
		year: string;
		actors: string[];
		synopsis: string;
		category: string;
	};

	export type FilmState = {
		films: FilmDomainModel.Film[];
		status: "idle" | "loading" | "failed";
		error: string | null;
		editFilm: FilmDomainModel.Film | null;
		addingMode: boolean;
		editingMode: boolean;
		formMode: boolean;
		filter: string;
		category: "owned" | "desired" | "televised";
	};
}
