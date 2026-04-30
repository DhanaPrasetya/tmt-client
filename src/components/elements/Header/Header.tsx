import React from "react";
import logo from "../../../assets/tmt_logo_no_bg.png";

const Header = () => {
	return (
		<div className="static pl-4 h-14 w-full border-b-4 border-[#4168EA] flex items-center">
			<img src={logo} alt="App logo" className="h-10" />
		</div>
	);
};

export default Header;
