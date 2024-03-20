import { useFormContext } from "react-hook-form";
import { AutoCompleteProps } from "../../models/AutoComplete.model";

type InputProps = {
	id: string;
	placeholder: string;
	required?: boolean;
	errormsg?: string;
	autoComplete?: AutoCompleteProps;
};

export const Textarea = ({
	id,
	placeholder,
	required = false,
	errormsg = "",
	autoComplete = "off",
}: InputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<>
			<textarea
				required
				id={id}
				{...register(id, {
					required: {
						value: required,
						message: errormsg,
					},
				})}
				placeholder={placeholder}
				autoComplete={autoComplete}
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="textarea textarea-bordered w-full text-white"
			/>
			{Object.keys(errors).length !== 0 && (
				<>{errors[id] && <InputError message={errormsg} />}</>
			)}
		</>
	);
};

const InputError = ({ message }: { message: string }) => {
	return (
		<p
			className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
			{...framer_error}
		>
			{message}
		</p>
	);
};

const framer_error = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 },
};
