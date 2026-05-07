import { createPortal } from "react-dom";

interface PortalProps {
	children: React.ReactNode;
}

const Popup = ({ children }: PortalProps) => {
	const mountElement = document.getElementById("popup-root");

	if (!mountElement) return null; // Safety check

	return createPortal(
		<div className="fixed top-0 left-0 w-screen h-screen bg-[#F4F4F4]/70 z-9999 flex items-center justify-center">
			{children}
		</div>,
		mountElement,
	);
};

export default Popup;
