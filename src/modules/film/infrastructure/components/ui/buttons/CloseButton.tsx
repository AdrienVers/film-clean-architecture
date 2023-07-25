import React from "react";
import CloseIcon from "../icons/CloseIcon";
import styles from "./close-button.module.scss";

type ButtonProps = {
	handleCloseClick: () => void;
};

const CloseButton: React.FC<ButtonProps> = ({ handleCloseClick }) => {
	return (
		<button aria-label="close" className={styles.closeButton} onClick={handleCloseClick}>
			<CloseIcon />
		</button>
	);
};

export default CloseButton;
