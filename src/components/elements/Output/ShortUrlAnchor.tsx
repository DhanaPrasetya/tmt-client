interface InputProps {
	children?: React.ReactNode;
}

const ShortUrlAnchor = ({
	children = "your output will appear here",
}: InputProps) => {
	return (
		<a
			href={`https://${children}`}
			target="_blank"
			rel="noopener noreferrer"
			className="text-[#4168EA] text-[18px] hover:underline hover:text-[#7A4EF3] font-bold"
		>
			{children}
		</a>
	);
};

export default ShortUrlAnchor;
