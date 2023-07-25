import React, { FormEvent, ReactNode } from "react";
import styles from "./film-form.module.scss";
import ToggleButton from "./ToggleButton";
import CloseButton from "../ui/buttons/CloseButton";
import SubmitButton from "../ui/buttons/SubmitButton";
import { useForm } from "./use-form";

const FilmForm: React.FC<{}> = () => {
	const presenter = useForm();

	return (
		<StyledContainer formMode={presenter.formMode}>
			<StyledListButton formMode={presenter.formMode}>
				<ToggleButton
					onAddClick={() => {
						presenter.handleOpenFormClick();
						presenter.handleOpenAddClick();
					}}
					onEditClick={() => {
						presenter.handleOpenFormClick();
						presenter.handleOpenEditClick();
					}}
					addText="Ajouter un film"
					editText="Modifier un film"
					disabled={presenter.addingMode || presenter.editingMode}
					addingMode={presenter.addingMode}
					editingMode={presenter.editingMode}
					formMode={presenter.formMode}
				/>
			</StyledListButton>
			<CloseButton
				handleCloseClick={() => {
					presenter.handleCloseFormClick();
					presenter.handleCloseAddClick();
					presenter.handleCloseEditClick();
				}}
			/>
			<StyledForm
				formMode={presenter.formMode}
				onSubmit={presenter.handleSubmit}
			>
				<div className={styles.inputRow}>
					<div className={styles.inputContainer}>
						<input
							name="title"
							type="text"
							value={presenter.filmData.title}
							onChange={presenter.getFilmData}
						/>
						<label>Titre</label>
					</div>
					<div className={styles.inputContainer}>
						<input
							name="director"
							type="text"
							value={presenter.filmData.director}
							onChange={presenter.getFilmData}
						/>
						<label>Réalisateur</label>
					</div>
					<div className={styles.inputContainer}>
						<input
							name="year"
							type="text"
							value={presenter.filmData.year}
							onChange={presenter.getFilmData}
						/>
						<label>Année</label>
					</div>
					<div className={styles.inputContainer} style={{ display: "none" }}>
						<input
							name="category"
							type="text"
							value={presenter.filmData.category}
							onChange={presenter.getFilmData}
						/>
						<label>Catégorie</label>
					</div>
				</div>
				<div className={styles.inputRow}>
					{[0, 1, 2, 3].map((index) => (
						<div key={index} className={styles.inputContainer}>
							<input
								name={`actor-${index}`}
								type="text"
								value={presenter.filmData.actors[index] || ""}
								onChange={presenter.getFilmData}
							/>
							<label>{`Acteur ${index + 1}`}</label>
						</div>
					))}
				</div>
				<div className={styles.textareaRow}>
					<div className={styles.inputContainer}>
						<textarea
							name="synopsis"
							value={presenter.filmData.synopsis}
							onChange={presenter.getFilmData}
						/>
						<label>Synopsis</label>
					</div>
				</div>
				<SubmitButton editingMode={presenter.editingMode} />
			</StyledForm>
		</StyledContainer>
	);
};

export default FilmForm;

interface StyledContainerProps {
	formMode: boolean;
	children: ReactNode;
}

const StyledContainer: React.FC<StyledContainerProps> = ({
	formMode,
	children,
}) => (
	<div
		className={styles.container}
		style={{ marginBottom: formMode ? "20px" : "5px" }}
	>
		{children}
	</div>
);

interface StyledListButtonProps {
	formMode: boolean;
	children: ReactNode;
}

const StyledListButton: React.FC<StyledListButtonProps> = ({
	formMode,
	children,
}) => (
	<div
		className={styles.listButton}
		style={{ top: formMode ? "-40px" : "-55px" }}
	>
		{children}
	</div>
);

interface StyledFormProps {
	formMode: boolean;
	children: ReactNode;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const StyledForm: React.FC<StyledFormProps> = ({
	formMode,
	children,
	onSubmit,
}) => (
	<form
		onSubmit={onSubmit}
		style={{ display: formMode ? "flex" : "none" }}
		role="form"
	>
		{children}
	</form>
);
