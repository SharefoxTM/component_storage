import classNames from "classnames";
import { useFormContext } from "react-hook-form";

type InputProps = {
	id: string;
	label: string;
	placeholder: string;
	fallback?: string;
	data?: {
		value: number;
		name: string;
	}[];
	width?: string;
	required?: boolean;
	errormsg?: string;
};

export const Select = ({
	id,
	label,
	placeholder,
	fallback,
	data,
	width,
	required = false,
	errormsg = "",
}: InputProps) => {
	const { register } = useFormContext();

	return (
		<>
			<label className={classNames("form-control", [width || "w-full"])}>
				<div className="label">
					<span className="label-text">{label}</span>
				</div>
				<select
					id={id}
					className="select select-bordered"
					defaultValue={0}
					{...register(id, {
						required: {
							value: required,
							message: errormsg,
						},
					})}
				>
					<option
						disabled
						value={0}
					>
						{placeholder}
					</option>
					{data && (
						<>
							{data?.length !== 0 &&
								data?.map(
									(
										optionData: {
											value: number;
											name: string;
										},
										key: number,
									) => (
										<option
											key={key}
											value={optionData.value}
										>
											{optionData.name}
										</option>
									),
								)}
							{data?.length === 0 && <option disabled>{fallback}</option>}
						</>
					)}
					{!data && (
						<option
							className="skeleton"
							disabled
						></option>
					)}
				</select>
			</label>
		</>
	);
};
