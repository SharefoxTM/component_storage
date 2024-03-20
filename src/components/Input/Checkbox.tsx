import { ChangeEventHandler } from "react";

type CheckboxProps = {
	id: string;
	label: string;
	checked: boolean;
	handleChange: ChangeEventHandler<HTMLInputElement>;
};
export const Checkbox = ({
	id,
	label,
	checked = false,
	handleChange,
}: CheckboxProps) => {
	return (
		<>
			<div className="label">
				<span className="label-text">{label}</span>
			</div>
			<input
				type="checkbox"
				id={id}
				className="toggle toggle-primary"
				onChange={handleChange}
				checked={checked}
			/>
		</>
	);
};
