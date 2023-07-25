import searchSlice, { searchActions } from "../slices/search.slice";
import { searchFilm } from "./search-film.usecase";

const dispatch = jest.fn();

describe("searchFilm", () => {
	it("dispatches setFilter with the correct payload", () => {
		const filterValue = "avatar";
		searchFilm(filterValue)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(searchActions.setFilter(filterValue));
	});

	it("updates the filter correctly", () => {
		const filterValue = "Avatar";
		const action = searchActions.setFilter(filterValue);
		const newState = searchSlice(undefined, action);

		expect(newState.filter).toEqual(filterValue);
	});
});

/*
describe("SearchFilmUsecase", () => {
	it("should be defined", () => {
		expect(true).toBeTruthy();
	});
});
*/
