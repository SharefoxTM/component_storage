import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";

type InputProps = {
	id: string;
	label: React.ReactElement;
	data?: {
		value: number;
		label: string;
	}[];
	width?: string;
	errormsg?: string;
};

type dataOptions = {
	value: number;
	label: string;
};

export const Selector = ({
	id,
	label,
	data,
	width = "w-full",
	errormsg = "",
}: InputProps) => {
	const {
		formState: { errors },
	} = useFormContext();

	const filterData = (inputValue: string) => {
		return data!.filter((i) =>
			i.label.toLowerCase().includes(inputValue.toLowerCase()),
		) as dataOptions[];
	};

	const promiseOptions = (inputValue: string) =>
		new Promise<dataOptions[]>((resolve) => {
			setTimeout(() => {
				resolve(filterData(inputValue));
			}, 1000);
		});

	return (
		<>
			<label className={classNames("form-control", [width])}>
				<div className="label">
					<span className="label-text">{label}</span>
				</div>
				<AsyncSelect
					cacheOptions
					defaultOptions={data}
					loadOptions={promiseOptions}
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
