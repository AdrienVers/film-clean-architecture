import React from "react";
import styles from "./film-search.module.scss";
import { useSearch } from "./use-search";
import SearchIcon from "../ui/icons/SearchIcon";

export const FilmSearch: React.FC<{}> = () => {
	const presenter = useSearch();

	return (
		<div className={styles.container}>
			<SearchIcon />
			<input
				type="text"
				placeholder="Rechercher"
				value={presenter.filter}
				onChange={presenter.onChangeHandler}
			/>
		</div>
	);
};
