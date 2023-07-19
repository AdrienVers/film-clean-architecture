import React from "react";
import { useList } from './use-list';
import { FilmDomainModel } from "../../../domain/model/film.domain-model";

export const FilmList = () => {
    const presenter = useList();

    if (presenter.status === "loading") {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <p>Voici : </p>
            {presenter.films &&
                presenter.films
                    .filter((item: FilmDomainModel.Film) =>
                        item.title.toLowerCase().startsWith(presenter.filter.toLowerCase()),
                    )
                    .map((item: FilmDomainModel.Film) => (
                        <div key={item.id} style={{ display: "flex", gap: "10px" }}>
                            <span>{item.title}</span>
                            <span>{item.director}</span>
                            <span>{item.year}</span>
                            <button onClick={() => presenter.handleUpdate(item.id)}>
                                Update
                            </button>
                            <button onClick={() => presenter.handleDelete(item.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
        </div>
    );
};