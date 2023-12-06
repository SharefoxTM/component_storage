import classNames from "classnames";

type InputProps = {
	id: string;
	type: string;
	label: string;
	placeholder: string;
	width?: string;
};

export const Input = ({ id, type, label, placeholder, width }: InputProps) => {
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
					type={type}
					placeholder={placeholder}
					className="input input-bordered w-full max-w-xs"
				/>
			</label>
		</>
	);
};
