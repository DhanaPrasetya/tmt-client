import React from "react";

interface ButtonProps {
	children?: React.ReactNode;
}

const Title = ({ children }: ButtonProps) => {
	return (
		<div className="font-bold text-5xl text-[#4168EA] flex flex-col items-center mt-20">
			Take Me To
			<h1 className="text-base text-black">{children}</h1>
		</div>
	);
};

export default Title;
