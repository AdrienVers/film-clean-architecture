import React from "react";
import styles from "./film-nav.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../domain/slices/films.slice";
import { AppState } from "../../../../../store/store";
import BuyIcon from "../ui/icons/BuyIcon";
import HomeIcon from "../ui/icons/HomeIcon";
import TVIcon from "../ui/icons/TVIcon";

function FilmNav() {
	const dispatch = useDispatch();
	const category = useSelector((state: AppState) => state.app.category);

	type Category = "owned" | "desired" | "televised";

	const categories: {
		name: Category;
		label: string;
		icon: React.ReactElement;
	}[] = [
		{ name: "owned", label: "Mes films", icon: <HomeIcon /> },
		{ name: "desired", label: "Prochains films", icon: <BuyIcon /> },
		{ name: "televised", label: "Films TV", icon: <TVIcon /> },
	];

	return (
		<div className={styles.container}>
			<div className={styles.toggleButton}>
				{categories.map(({ name, label, icon }) => (
					<button
						key={name}
						style={{
							background: category === name ? "white" : "rgb(220, 220, 220)",
							color: category === name ? "black" : "rgb(100, 100, 100)",
							cursor: category === name ? "default" : "pointer",
							boxShadow:
								category === name ? "0 0 0 0.3px rgb(100, 100, 100)" : "",
						}}
						onClick={() => dispatch(setCategory(name))}
					>
						<span className={styles.name}>{label}</span>
						<span className={styles.icon}>{icon}</span>
					</button>
				))}
			</div>
		</div>
	);
}

export default FilmNav;
