import Button from "../components/elements/Button/Button";
import Footer from "../components/elements/Footer";
import Header from "../components/elements/Header/Header";
import Input from "../components/elements/Input/Input";
import Popup from "../components/elements/Popups/Popup";
import Title from "../components/elements/Title/Title";
import ShortUrlPopup from "../components/layouts/ShortUrlPopup";
import type {
	ShortingUrl,
	StandarizedResponse,
} from "../interfaces/global.interface";
import { getOriginalUrl, createShortUrl } from "../services/apiService";
import { useEffect, useState } from "react";

function Home() {
	const [originalUrl, setOriginalUrl] = useState<StandarizedResponse | null>( // getter, setter (updating), and possible value of the state variable
		null,
	);

	useEffect(() => {
		// mini function inside to handle awaiting the response from the API call, and then update the state with the response data
		(async () => {
			try {
				const response = await getOriginalUrl("test");
				setOriginalUrl(response);
			} catch (error) {
				console.error("Error:", error);
			}
		})();
	}, []); // run once when the component mounts

	const [formData, setFormData] = useState<ShortingUrl>({
		// DTO, following api contract, and initial value of the form data state
		original_url: "",
		custom_alias: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false); // state to track submission loading state

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);
			const response = await createShortUrl(formData);
			setOriginalUrl(response);
		} catch (error) {
			console.error("Error creating short url:", error);
		}
	};

	return (
		<div className="gap-12 flex flex-col  items-center h-screen">
			<Header />
			<Title>an url shortener</Title>
			{isSubmitting && (
				<Popup>
					<ShortUrlPopup
						url={
							(originalUrl?.data as { short_url?: string } | undefined)
								?.short_url
						}
						onClose={() => setIsSubmitting(false)}
					></ShortUrlPopup>
				</Popup>
			)}
			<Input
				name="original_url"
				type="text"
				placeholder="Your original url"
				value={formData.original_url}
				onChange={(e) =>
					setFormData((prev) => ({ ...prev, original_url: e.target.value }))
				}
			/>
			<Input
				name="custom_alias"
				type="text"
				placeholder="Your short custom url alias"
				value={formData.custom_alias}
				onChange={(e) =>
					setFormData((prev) => ({ ...prev, custom_alias: e.target.value }))
				}
			/>
			<Button buttonColor="#4168EA" textColor="#FFFFFF" onClick={handleSubmit}>
				Short it !
			</Button>
			<p>{originalUrl ? JSON.stringify(originalUrl.data) : ""}</p>
			<Footer link_to="/about">About This Site</Footer>
		</div>
	);
}

export default Home;
