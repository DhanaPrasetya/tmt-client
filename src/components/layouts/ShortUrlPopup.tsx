import ShortUrlAnchor from "../elements/Output/ShortUrlAnchor";
import logo from "../../assets/clipboard-paste-memory-editor-copy-paste.svg";
import { useState } from "react";

interface InputProps {
	url?: string;
	onClose: () => void;
}

const ShortUrlPopup = ({ url, onClose }: InputProps) => {
	const [copied, setCopied] = useState(false);

	const domainUrl = `${import.meta.env.VITE_DOMAIN}/${url}`;

	const handleCopy = async () => {
		await navigator.clipboard.writeText(domainUrl);
		setCopied(true);

		// Reset the button text after 2 seconds
		setTimeout(() => setCopied(false), 1000);
	};

	return (
		<div className="outline-[#4168EA] outline-3 rounded-xl bg-[#F4F4F4] flex flex-col items-center">
			<button
				type="button"
				onClick={onClose}
				className="self-end font-bold text-3xl p-2 hover:text-[#7A4EF3]"
			>
				X
			</button>
			<div className="p-3 bg-[#D9D9D9] rounded-xl w-lg flex flex-col m-10 text-center break-all">
				<ShortUrlAnchor>{domainUrl}</ShortUrlAnchor>
			</div>
			<button
				onClick={handleCopy}
				className="outline-[#7A4EF3] outline-2 text-black font-bold px-3 py-1 rounded-xl flex flex-row align-items-center gap-2 mx-auto mb-8 items-center
			
			hover:outline-black hover:outline-3 hover:text-[#7A4EF3] transition-all duration-100
			"
			>
				<img src={logo} alt="copy logo" className="h-9" />
				{copied ? "copied!" : "copy to clipboard"}{" "}
			</button>
		</div>
	);
};

export default ShortUrlPopup;
