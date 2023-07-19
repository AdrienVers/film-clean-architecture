import React from "react";
import { useSearch } from './use-search';

export const FilmSearch = () => {
    const presenter = useSearch();

    return (
        <input
            type="text"
            placeholder="Rechercher"
            value={presenter.filter}
            onChange={presenter.onChangeHandler}
        />
    );
};