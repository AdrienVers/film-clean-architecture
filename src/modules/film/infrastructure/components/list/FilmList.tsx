import React from "react";
import { useList } from "./use-list";
import { FilmDomainModel } from "../../../domain/model/film.domain-model";
import styles from "./film-list.module.scss";
import DeleteButton from "../ui/buttons/DeleteButton";
import UpdateButton from "../ui/buttons/UpdateButton";

export const FilmList: React.FC<{}> = () => {
	const presenter = useList();

	if (presenter.status === "loading") {
		return <h1>Chargement des films...</h1>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.td} id={styles.tdt}>
								Film
							</th>
							<th className={styles.td} id={styles.tdt}>
								Réalisateur
							</th>
							<th className={styles.td} id={styles.tdt}>
								Date
							</th>
							<th className={styles.td} id={styles.tdt}>
								Acteurs
							</th>
							<th className={styles.td} id={styles.tdt}>
								Synopsis
							</th>
							<th className={styles.td} id={styles.tdt}>
								Modifier
							</th>
						</tr>
					</thead>
					<tbody className={styles.tbody}>
						{presenter.films &&
							presenter.films
								.filter((item: FilmDomainModel.Film) =>
									item.title
										.toLowerCase()
										.startsWith(presenter.filter.toLowerCase()),
								)
								.filter(
									(item: FilmDomainModel.Film) =>
										item.category === presenter.category,
								)
								.map((item: FilmDomainModel.Film) => (
									<tr className={styles.tr} key={item.id}>
										<td className={styles.td}>{item.title}</td>
										<td className={styles.td}>{item.director}</td>
										<td className={styles.td}>{item.year}</td>
										<td className={styles.td}>
											<div className={styles.actors}>
												{item.actors.map((actor, index) => (
													<p key={index}>{actor}</p>
												))}
											</div>
										</td>
										<td className={styles.td}>{item.synopsis}</td>
										<td className={styles.td} style={{ flexDirection: "row" }}>
											<UpdateButton
												handleUpdateClick={() => {
													presenter.handleOpenFormClick();
													presenter.handleUpdate(item.id);
												}}
											/>
											<DeleteButton
												handleDeleteClick={() => {
													presenter.handleDelete(item.id);
												}}
											/>
										</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
