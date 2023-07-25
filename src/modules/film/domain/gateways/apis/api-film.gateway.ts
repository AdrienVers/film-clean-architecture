import { FilmDomainModel } from "../../model/film.domain-model";
import { IFilmGateway } from "../film.gateway";
import { IHttpClient } from "./http-film.gateway";

export class ApiFilmGateway implements IFilmGateway {
	private apiURL = "http://localhost:5000/films";

	constructor(private httpClient: IHttpClient) {}
}
