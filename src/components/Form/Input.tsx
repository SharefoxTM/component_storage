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
	width,
	required = false,
	errormsg = "",
}: InputProps) => {
	const { register } = useFormContext();
	return (
		<>
			<label
				className={classNames("form-control", [width || "w-full"], "max-w-xs")}
			>
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
			</label>
		</>
	);
};
