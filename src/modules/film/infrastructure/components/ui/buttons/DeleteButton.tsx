import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import styles from "./delete-button.module.scss";

type ButtonProps = {
	handleDeleteClick: () => void;
};

const DeleteButton: React.FC<ButtonProps> = ({ handleDeleteClick }) => {
	return (
		<button
			aria-label="delete"
			className={styles.deleteButton}
			onClick={handleDeleteClick}
		>
			<DeleteIcon />
		</button>
	);
};

export default DeleteButton;
