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
import { createShortUrl } from "../services/apiService";
import { useEffect, useState } from "react";
import InternalError from "./InternalError";

function Home() {
	const [originalUrl, setOriginalUrl] = useState<StandarizedResponse | null>( // getter, setter (updating), and possible value of the state variable
		null,
	);

	const [internalError, setInternalError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false); // state to track submission loading state

	const [formData, setFormData] = useState<ShortingUrl>({
		// DTO, following api contract, and initial value of the form data state
		original_url: "",
		custom_alias: "",
	});

	const handleSubmit = async () => {
		try {
			const response = await createShortUrl(formData);
			if (response) {
				setIsSubmitting(true);
			}
			setOriginalUrl(response);
		} catch (error) {
			console.error("Error creating short url:", error);
			setInternalError(true);
		}
	};

	// Input validation errors state
	const [errors, setErrors] = useState({
		original_url: "",
		custom_alias: "",
	});

	// Tracking which fields have been modified
	const [touched, setTouched] = useState({
		original_url: false,
		custom_alias: false,
	});

	const validateForm = (currentFormData: ShortingUrl) => {
		const newErrors = { original_url: "", custom_alias: "" };

		// 1. Protocol Validation
		const protocolRegex = /^https?:\/\/.+/;
		if (
			currentFormData.original_url &&
			!protocolRegex.test(currentFormData.original_url)
		) {
			newErrors.original_url = "Must include http:// or https://";
		}

		// 2. Alias Whitelist Validation (3-50 chars, alphanumeric, -, _)
		const aliasRegex = /^[a-zA-Z0-9-_]{3,50}$/;
		if (
			currentFormData.custom_alias &&
			!aliasRegex.test(currentFormData.custom_alias)
		) {
			newErrors.custom_alias =
				"Use 3-50 alphanumeric characters, dashes, or underscores.";
		}

		setErrors(newErrors);
	};

	const handleBlur = (field: keyof typeof touched) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		validateForm(formData);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			validateForm(formData);
		}, 0);

		return () => clearTimeout(timer);
	}, [formData]);

	if (internalError) return <InternalError />;

	return (
		<div className="gap-12 flex flex-col  items-center h-screen">
			<Header />
			<Title>an url shortener</Title>

			{isSubmitting && ( // conditional rendering of the popup based on the submission state
				<Popup>
					<ShortUrlPopup
						url={
							(originalUrl?.data as { custom_alias?: string } | undefined)
								?.custom_alias
						}
						onClose={() => setIsSubmitting(false)}
					></ShortUrlPopup>
				</Popup>
			)}

			<div className="flex flex-col w-full max-w-lg gap-1">
				{touched.original_url && errors.original_url && (
					<p className="text-red-500 text-xs italic">
						set{errors.original_url}
					</p>
				)}
				<Input
					name="original_url"
					type="text"
					placeholder="Your original url"
					value={formData.original_url}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, original_url: e.target.value }))
					}
					onBlur={() => handleBlur("original_url")}
				/>
			</div>

			<div className="flex flex-col w-full max-w-lg gap-1">
				{touched.custom_alias && errors.custom_alias && (
					<p className="text-red-500 text-xs italic">
						set{errors.custom_alias}
					</p>
				)}
				<Input
					name="custom_alias"
					type="text"
					placeholder="Your short custom url alias"
					value={formData.custom_alias}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, custom_alias: e.target.value }))
					}
					onBlur={() => handleBlur("custom_alias")}
				/>
			</div>
			<Button
				buttonColor="#4168EA"
				textColor="#FFFFFF"
				onClick={handleSubmit}
				py={8}
				px={20}
			>
				Short it !
			</Button>
			<Footer link_to="/about">About This Site</Footer>
		</div>
	);
}

export default Home;
