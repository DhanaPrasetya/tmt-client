import { useEffect, useState } from "react";
import { getOriginalUrl } from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/tmt_logo_no_bg.png";
import InternalError from "../../pages/InternalError";
import NotFound from "../../pages/NotFound";
import Button from "../elements/Button/Button";

function Redirect() {
	const { alias } = useParams<{ alias: string }>();
	const navigate = useNavigate();

	// State to track if either error occurred during the redirect process
	const [internalError, setInternalError] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [takeMeThereButton, setTakeMeThereButton] = useState(false);
	const [originalUrl, setOriginalUrl] = useState<string | null>(null);
	const [startTimer, setStartTimer] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const performRedirect = async () => {
			if (!alias) {
				setNotFound(true);
				return;
			}

			// Validate alias: min 3 chars, only alphanumeric
			const isValidAlias = /^[a-zA-Z0-9-_]{3,50}$/.test(alias);
			if (!isValidAlias) {
				setNotFound(true);
				return;
			}

			try {
				const response = await getOriginalUrl(alias);
				const data = response.data as { original_url?: string };

				if (data.original_url) {
					setOriginalUrl(data.original_url);
					setStartTimer(true);
					setRedirect(true);

					if (takeMeThereButton) {
						window.location.replace(data.original_url);
					}
				}
			} catch (error) {
				console.error("Error fetching original URL:", error);
				const err = error as Error & { status?: number };

				// Handle 404 - alias not found
				if (err.status === 404) {
					setNotFound(true);
				} else {
					// Handle other errors as internal errors
					setInternalError(true);
				}
				return;
			}
		};

		performRedirect();
	}, [alias, navigate, takeMeThereButton]);

	// Timer
	const [seconds, setSeconds] = useState(5); // 5 seconds

	useEffect(() => {
		if (!startTimer) return;

		if (seconds > 0) {
			const timerId = setInterval(() => setSeconds((s) => s - 1), 1000);
			return () => clearInterval(timerId); // Cleanup
		}

		// when timer reaches 0, navigate to the original URL if available
		if (seconds === 0 && originalUrl) {
			window.location.replace(originalUrl);
		}
	}, [startTimer, seconds, originalUrl]);

	if (internalError) return <InternalError />;
	if (notFound) return <NotFound />;

	if (redirect) {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<div className="flex flex-col items-center bg-[#D9D9D9] w-200 flex-wrap  rounded-3xl justify-center p-10 gap-10 drop-shadow-xl">
					<img src={logo} alt="Logo" className="w-50 h-50" />
					<div className="flex flex-col gap-3 items-center">
						<h1 className="font-bold text-4xl">Redirecting...</h1>
						<h2 className="text-2xl">You will be redirected in</h2>
					</div>
					<p className="text-2xl outline-4 outline-[#4168EA] text-black rounded-full py-3 px-5 font-bold">
						{seconds}
					</p>
					<Button
						buttonColor="#4168EA"
						textColor="white"
						px={10}
						py={5}
						onClick={() => setTakeMeThereButton(true)}
					>
						Take Me There Now
					</Button>
				</div>
			</div>
		);
	}
}

export default Redirect;
