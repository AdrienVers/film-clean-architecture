import React, { CSSProperties } from "react";
import TextButton from "../ui/buttons/TextButton";

interface ToggleButtonProps {
	onAddClick: () => void;
	onEditClick: () => void;
	addText: string;
	editText: string;
	disabled?: boolean;
	style?: CSSProperties;
	addingMode: boolean;
	editingMode: boolean;
	formMode: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
	onAddClick,
	onEditClick,
	addText,
	editText,
	disabled,
	addingMode,
	editingMode,
	formMode,
}) => {
	const addButtonStyle = {
		display: "flex",
		background:
			addingMode || !formMode ? "rgb(28, 79, 88)" : "rgb(220, 220, 220)",
		color: addingMode || !formMode ? "white" : "rgb(100, 100, 100)",
		cursor: addingMode || editingMode ? "default" : "pointer",
	};

	const editButtonStyle = {
		display: editingMode || addingMode ? "flex" : "none",
		background: editingMode ? "rgb(28, 79, 88)" : "rgb(220, 220, 220)",
		color: editingMode ? "white" : "rgb(100, 100, 100)",
	};

	return (
		<>
			<TextButton
				onClick={onAddClick}
				text={addText}
				disabled={disabled}
				style={addButtonStyle}
			/>
			<TextButton
				onClick={onEditClick}
				text={editText}
				disabled={disabled}
				style={editButtonStyle}
			/>
		</>
	);
};

export default ToggleButton;
