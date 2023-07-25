import React from "react";
import styles from "./update-button.module.scss";
import UpdateIcon from "../icons/UpdateIcon";

type ButtonProps = {
	handleUpdateClick: () => void;
};

const UpdateButton: React.FC<ButtonProps> = ({ handleUpdateClick }) => {
	return (
		<button
			aria-label="update"
			className={styles.updateButton}
			onClick={handleUpdateClick}
		>
			<UpdateIcon />
		</button>
	);
};

export default UpdateButton;
