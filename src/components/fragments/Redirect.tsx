import { useEffect } from "react";
import { getOriginalUrl } from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

function Redirect() {
	const { alias } = useParams<{ alias: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		const performRedirect = async () => {
			if (!alias) {
				navigate("/not-found", { replace: true });
				return;
			}

			try {
				const response = await getOriginalUrl(alias);
				const data = response.data as { original_url?: string };

				if (data.original_url) {
					// This is the equivalent of a 302 redirect in the browser
					window.location.replace(data.original_url);
				} else {
					navigate("/not-found", { replace: true });
					console.log("Original URL not found for alias:", alias);
				}
			} catch (error) {
				console.error("Error fetching original URL:", error);
				navigate("/not-found", { replace: true });
			}
		};

		performRedirect();
	}, [alias, navigate]);

	return (
		<div className="flex h-screen items-center justify-center">
			<p className="text-lg font-medium">Redirecting you shortly...</p>
		</div>
	);
}

export default Redirect;
