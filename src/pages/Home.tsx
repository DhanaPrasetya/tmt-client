import Button from "../components/elements/Button/Button";
import Footer from "../components/elements/Footer";
import Header from "../components/elements/Header/Header";
import Input from "../components/elements/Input/Input";
import Title from "../components/elements/Title/Title";
import { getProducts } from "../services/urlService";
import { useEffect } from "react";

function Home() {
	// useEffect(() => {
	// 	const response = getOriginalUrl("short123");
	// 	console.log(response);
	// });
	useEffect(() => {
		getProducts()
			.then((data) => {
				console.log("Products:", data);
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	}, []);

	return (
		// bg-gray-200 (background page color)
		<div className="gap-12 flex flex-col  items-center h-screen">
			<Header />
			<Title>an url shortener</Title>
			<Input name="original url" type="text" placeholder="Your original url" />
			<Input
				name="original url"
				type="text"
				placeholder="Your short custom url alias"
			/>
			<Button buttonColor="#4168EA" textColor="#FFFFFF">
				Short it !
			</Button>
			<Footer link_to="/about">About This Site</Footer>
		</div>
	);
}

export default Home;
