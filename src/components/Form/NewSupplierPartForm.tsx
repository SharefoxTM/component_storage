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
					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Stock keeping unit *</span>
						</div>
						<Input
							id="SKU"
							placeholder="SKU"
							type="text"
							errormsg="Please fill in the SKU"
							required
						/>
					</div>

					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Select supplier *</span>
						</div>
						<Controller
							control={methods.control}
							defaultValue={[]}
							name="supplier"
							rules={{ required: true }}
							render={({ field }) => {
								return (
									<Select
										id={field.name}
										data={suppliers.data?.map((val: APISupplierDetail) => ({
											value: val.pk,
											label: val.name,
										}))}
										errormsg="Select the supplier."
									/>
								);
							}}
						/>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};
