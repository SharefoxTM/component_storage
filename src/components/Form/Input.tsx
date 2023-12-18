import classNames from "classnames";
import { useFormContext } from "react-hook-form";

type InputProps = {
	id: string;
	type: string;
	label: string;
	placeholder: string;
	width?: string;
	required?: boolean;
	errormsg?: string;
};

export const Input = ({
	id,
	type,
	label,
	placeholder,
	width = "w-full",
	required = false,
	errormsg = "",
}: InputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<>
			<label className={classNames("form-control", [width], "max-w-xs")}>
				<div className="label">
					<span className="label-text">{label}</span>
				</div>
				<input
					required
					id={id}
					{...register(id, {
						required: {
							value: required,
							message: errormsg,
						},
					})}
					type={type}
					placeholder={placeholder}
					className="input input-bordered w-full max-w-xs"
				/>
				{Object.keys(errors).length !== 0 && (
					<>{errors[id] && <InputError message={errormsg} />}</>
				)}
			</label>
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
