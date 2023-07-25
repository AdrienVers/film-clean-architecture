import React from "react";
import styles from "./submit-button.module.scss";

interface ButtonProps {
	editingMode: boolean;
}

const SubmitButton: React.FC<ButtonProps> = ({ editingMode }) => {
	return (
		<div className={styles.submitButton}>
			<button type="submit">
				{editingMode
					? "Mettre à jour le film"
					: "Ajouter le film dans la liste"}
			</button>
		</div>
	);
};

export default SubmitButton;
