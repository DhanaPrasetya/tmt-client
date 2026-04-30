import Footer from "../components/elements/Footer";
import Header from "../components/elements/Header/Header";
import Title from "../components/elements/Title/Title";
import logo from "../assets/tmt_logo_no_bg.png";

function About() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<main className="flex-1 flex flex-row justify-center items-center gap-8 px-4 pb-50">
				<img src={logo} alt="logo" className="h-22 mt-16" />
				<div className="flex flex-col items-start gap-2">
					<Title />
					<p className="text-lg">
						is an free url shortener. It was made for personal portofolio.
					</p>
				</div>
			</main>

			<Footer link_to="/">Back to Home Page</Footer>
		</div>
	);
}

export default About;
