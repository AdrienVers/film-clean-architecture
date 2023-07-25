import React from "react";
import FilmForm from "../components/form/FilmForm";
import { FilmList } from "../components/list/FilmList";
import FilmNav from "../components/nav/FilmNav";
import { FilmSearch } from "../components/search/FilmSearch";
import styles from "./home-page.module.scss";

export const HomePage: React.FC = () => {
	return (
		<div className={styles.container}>
			<FilmNav />
			<FilmForm />
			<FilmSearch />
			<div style={{ height: "20px" }} />
			<FilmList />
			<div style={{ height: "20px" }} />
		</div>
	);
};
