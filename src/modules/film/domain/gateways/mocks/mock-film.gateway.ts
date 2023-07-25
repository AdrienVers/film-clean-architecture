import { FilmDomainModel } from "../../model/film.domain-model";
import { IFilmGateway } from "../film.gateway";

export class MockFilmGateway implements IFilmGateway {
    constructor(private data: FilmDomainModel.Film[] = []) {}

    async getFilms(): Promise<FilmDomainModel.Film[]> {
        return this.data;
    }
}
