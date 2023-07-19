"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilm } from "../../film/domain/slices/film.slice";

const Navbar = () => {
	const allFilms = useSelector((state) => state.app.films);
	const dispatch = useDispatch();
	const [searchData, setSearchData] = useState("");

	useEffect(() => {
		dispatch(searchFilm(searchData));
	}, [searchData]);

	return (
		<nav style={{ display: "flex", gap: "10px" }}>
			<Link style={{ textDecoration: "none", color: "black" }} href="/">
				Create Post
			</Link>
			<Link style={{ textDecoration: "none", color: "black" }} href="/posts">
				All Posts ({allFilms.length})
			</Link>
			<input
				type="search"
				placeholder="Search"
				value={searchData}
				onChange={(e) => setSearchData(e.target.value)}
			/>
		</nav>
	);
};
export default Navbar;
