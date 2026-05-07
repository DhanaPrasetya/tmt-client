import type { ChangeEvent } from "react";

interface InputProps {
	name: string;
	type: string;
	placeholder: string;
	value: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, type, placeholder, value, onChange }: InputProps) => {
	return (
		<input
			name={name}
			type={type}
			id={name} // same as 'htmlFor' in Label component
			className="py-2 pl-4 bg-[#D9D9D9] font-[#7A7A7A] rounded-xl text-[18px] w-lg"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

export default Input;
