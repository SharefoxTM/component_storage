import classNames from "classnames";
import { useFormContext } from "react-hook-form";

type InputProps = {
	id: string;
	label: React.ReactElement;
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
	width = "w-full",
	required = false,
	errormsg = "",
}: InputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	console.log(data);
	return (
		<>
			<label className={classNames("form-control", [width])}>
				<div className="label">
					<span className="label-text">{label}</span>
				</div>
				<select
					id={id}
					defaultValue=""
					className="select select-bordered"
					{...register(id, {
						required: {
							value: required,
							message: errormsg,
						},
					})}
				>
					<option
						value=""
						disabled
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
						</>
					)}
					{!data === undefined && (
						<option
							className="skeleton"
							disabled
						></option>
					)}
				</select>
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
