import { useFormContext } from "react-hook-form";
import { ActionMeta, ClassNamesConfig } from "react-select";
import AsyncSelect from "react-select/async";

type InputProps = {
	id: string;
	data?: {
		value: number;
		label: string;
	}[];
	errormsg?: string;
	autoFocus?: boolean;
	isDisabled?: boolean;
	isMulti?: boolean;
	isSearchable?: boolean;
	onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};
type dataOptions = {
	value: number;
	label: string;
};

const SelectClassNames: ClassNamesConfig = {
	container: () => "border dark:border-gray-700 h-12 rounded align-center",
	indicatorsContainer: () => "p-3",
	input: () => "dark:text-white ps-3",
	menu: () => "dark:bg-neutral-700 bg-neutral-300",
	noOptionsMessage: () => "dark:bg-gray-700 dark:text-white p-3",
	option: () =>
		"dark:text-white p-2 dark:bg-gray-800 hover:dark:bg-neutral-500 active:bg-blue-300",
	placeholder: () => "dark:text-white ps-3",
	singleValue: () => "dark:text-white ps-3",
};

export const Select = ({
	id,
	data,
	errormsg = "",
	autoFocus = false,
	isDisabled = false,
	isMulti = false,
	isSearchable = false,
	onChange,
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
			<AsyncSelect
				classNames={SelectClassNames}
				cacheOptions
				unstyled
				defaultOptions={data}
				loadOptions={promiseOptions}
				autoFocus={autoFocus}
				isDisabled={isDisabled}
				isMulti={isMulti}
				isSearchable={isSearchable}
				onChange={onChange}
				placeholder={isSearchable ? "Search..." : "Select..."}
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
