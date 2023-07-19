"use client";

import { FilmSearch } from "@/modules/film/infrastructure/components/search/FilmSearch";
import FilmForm from "../modules/film/infrastructure/components/form/FilmForm";
import { FilmList } from "../modules/film/infrastructure/components/list/FilmList";

export default function Home() {
	return (
		<main>
			<FilmForm />
			<FilmSearch />
			<FilmList />
		</main>
	);
}
