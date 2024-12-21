import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "../Input/Input";
import { Select } from "../Input/Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ParameterItems } from "../../models/ParameterItems.model";
import { useEffect, useState } from "react";
import { Option } from "../../models/Option.model";

type ParameterFormProps = {
	methods: UseFormReturn;
	isLoading?: boolean;
	setter?: React.Dispatch<React.SetStateAction<Option | undefined>>;
};

export const ParameterForm = ({
	methods,
	isLoading = false,
	setter,
}: ParameterFormProps) => {
	const parameters = useQuery({
		queryKey: ["parameterTemplates"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_API_URL}parts/parameter/template/`)
				.then((res) => res.data),
	});

	const [selectedParameter, setSelectedParameter] = useState<Option>();

	useEffect(() => {
		if (setter !== undefined) setter(selectedParameter);
	}, [selectedParameter, setter, methods]);

	return (
		<FormProvider {...methods}>
			<form
				id="newParameterForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				{isLoading && <div>Data is being loaded, please wait...</div>}
				{!isLoading && (
					<>
						<div className="form-control w-full">
							<div className="label">
								<span className="label-text">Select parameter template *</span>
							</div>
							<Select
								id="template"
								methods={methods}
								options={(parameters.data as ParameterItems)?.map((val) => ({
									value: val.pk,
									label: val.name,
								}))}
								errormsg="Select the template."
								required
								value={selectedParameter}
								setter={setSelectedParameter}
								isSearchable
							/>
						</div>
						<div className="form-control w-full">
							<div className="label">
								<span className="label-text">Data *</span>
							</div>
							<Input
								id="data"
								placeholder="data"
								type="text"
								errormsg="Please fill in the data"
								required
							/>
						</div>
					</>
				)}
			</form>
		</FormProvider>
	);
};
