import React from "react";

interface ButtonProps {
	buttonColor: string;
	textColor: string;
	onClick?: () => void;
	children: React.ReactNode;
}

const Button = ({ buttonColor, textColor, onClick, children }: ButtonProps) => {
	return (
		<button
			style={
				{
					"--bg-color": buttonColor,
					"--text-color": textColor,
				} as React.CSSProperties
			}
			className="
                rounded-lg py-2 px-12 font-bold max-w-44 transition-colors duration-100
                bg-[var(--bg-color)] text-[var(--text-color)]
                hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]
                border border-[var(--bg-color)]
            "
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
