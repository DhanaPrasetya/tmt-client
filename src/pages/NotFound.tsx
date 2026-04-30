import logo from "../assets/tmt_logo_no_bg.png";
import Header from "../components/elements/Header/Header";
import Footer from "../components/elements/Footer";

function NotFound() {
	return (
		<div>
			<Header />
			<div className="flex flex-col items-center h-screen pt-15">
				<div className="flex flex-row text-[#4168EA] text-[15rem]">
					<h1>4</h1>
					<img src={logo} alt="logo" className="h-40 ml-6 mt-21" />
					<h1>4</h1>
				</div>
				<h2 className="font-bold text-[2rem] mt-1">Oops! Url Not Found</h2>
				<p className="pt-3 text-xl">
					The short URL you followed seems to be invalid.
				</p>
			</div>
			<Footer link_to="/">Back to Home page</Footer>
		</div>
	);
}

export default NotFound;
