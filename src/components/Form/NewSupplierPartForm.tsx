import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { Select } from "./Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APISupplierDetail } from "../../models/APISupplierDetail.model";

const enterToTab = (e: React.KeyboardEvent) => {
	if (
		e.key === "Enter" &&
		!e.getModifierState("Shift") &&
		(e.target as HTMLElement).nodeName === "INPUT"
	) {
		document.getElementById("supplier")?.focus();
		e.preventDefault();
	} else if (
		e.key === "Enter" &&
		!e.getModifierState("Shift") &&
		(e.target as HTMLElement).nodeName !== "INPUT"
	) {
		document.getElementById("SKU")?.focus();
		e.preventDefault();
	} else {
		e.preventDefault();
	}
};

export const NewSupplierPartForm = ({
	methods,
}: {
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
				onKeyUp={enterToTab}
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
					<Controller
						control={methods.control}
						defaultValue={[]}
						name="supplier"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<Select
									id={field.name}
									label={<p>Supplier *</p>}
									data={suppliers.data?.map((val: APISupplierDetail) => ({
										value: val.pk,
										label: val.name,
									}))}
									width="w-1/2"
									errormsg="Select the a supplier."
								/>
							);
						}}
					/>
				</div>
			</form>
		</FormProvider>
	);
};
