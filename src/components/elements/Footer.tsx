import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
	link_to: string;
	children: React.ReactNode;
}

const Footer = ({ link_to, children }: FooterProps) => {
	return (
		<footer className="flex justify-center bg-[#4168EA] text-[#F4F4F4] p-3 fixed inset-x-0 bottom-0">
			<Link to={link_to} className="hover:text-white">
				{children}
			</Link>
		</footer>
	);
};

export default Footer;
