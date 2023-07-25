import { IFilmGateway } from "../film.gateway";

export class FailingFilmGateway implements IFilmGateway {
	async getFilms(): Promise<any> {
		throw new Error("Failed to fetch data");
	}
}
