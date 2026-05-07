import React from "react";

interface ButtonProps {
	buttonColor: string;
	textColor: string;
	onClick?: () => void;
	children: React.ReactNode;
	imgPath?: string;
	outlineColor?: string;
}

const Button = ({
	buttonColor,
	textColor,
	onClick,
	children,
	imgPath,
	outlineColor,
}: ButtonProps) => {
	return (
		<div className="flex flew-row">
			<button
				style={
					{
						"--bg-color": buttonColor,
						"--text-color": textColor,
						"--outline-color": outlineColor || "transparent",
						outline: `2px solid var(--outline-color)`,
					} as React.CSSProperties
				}
				className="
                rounded-lg py-2 px-12 font-bold max-w-44 transition-colors duration-100
                bg-[var(--bg-color)] text-[var(--text-color)]
                hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]
                border border-[var(--bg-color)] flex flex-row
            "
				onClick={onClick}
			>
				{imgPath && <img src={imgPath} alt="logo" />}
				{children}
			</button>
		</div>
	);
};

export default Button;
