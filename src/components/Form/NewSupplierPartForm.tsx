import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { Select } from "./Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APISupplierDetail } from "../../models/APISupplierDetail.model";

export const NewSupplierPartForm = ({
	id,
	methods,
}: {
	id: string;
	methods: UseFormReturn;
}) => {
	const suppliers = useQuery({
		queryKey: ["suppliers"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}company/suppliers/`)
				.then((res) => res.data),
	});
	return (
		<FormProvider {...methods}>
			<form
				id="newSupplierPartForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<div className="w-full flex gap-2">
					<Input
						id="SKU"
						label="Stock keeping unit"
						placeholder="SKU"
						type="text"
						errormsg="Please fill in the SKU"
						width="w-1/2"
						required
					/>
					<Select
						id="Supplier"
						label={<p>Supplier</p>}
						placeholder="Select a supplier"
						data={suppliers.data?.map((val: APISupplierDetail) => ({
							value: val.pk,
							name: val.name,
						}))}
						errormsg="Please select a supplier"
						fallback="No suppliers found!"
						width="w-1/2"
						required
					/>
				</div>
			</form>
		</FormProvider>
	);
};
