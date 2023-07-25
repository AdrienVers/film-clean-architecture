import React, { CSSProperties } from "react";

interface ButtonProps {
	onClick: () => void;
	text: string;
	disabled?: boolean;
	style?: CSSProperties;
}

const TextButton: React.FC<ButtonProps> = ({
	onClick,
	text,
	disabled = false,
	style,
}) => {
	return (
		<button onClick={onClick} disabled={disabled} style={style}>
			{text}
		</button>
	);
};

export default TextButton;
