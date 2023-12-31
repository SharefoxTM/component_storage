import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { Select } from "./Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APISupplierDetail } from "../../models/APISupplierDetail.model";
import { useState } from "react";
import { APIGetPart } from "../../models/APIGetPart.model";

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
	id,
	methods,
}: {
	id?: string;
	methods: UseFormReturn;
}) => {
	const [partID, setPartID] = useState<number | undefined>(
		id !== undefined ? parseInt(id) : undefined,
	);
	const parts = useQuery({
		queryKey: ["parts"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/`)
				.then((res) => res.data),
		enabled: partID === undefined,
	});

	const suppliers = useQuery({
		queryKey: ["newSupplierForm"],
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
				{id === undefined && (
					<div className="w-full flex gap-2">
						<div className="form-control w-full">
							<div className="label">
								<span className="label-text">Select Part *</span>
							</div>
							<Select
								id="part"
								methods={methods}
								setter={setPartID}
								isSearchable
								options={parts.data?.map((val: APIGetPart) => ({
									value: val.pk,
									label: val.name,
								}))}
								errormsg="Select the part"
							/>
						</div>
					</div>
				)}
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
						<Select
							id="newSP"
							methods={methods}
							options={suppliers.data?.map((val: APISupplierDetail) => ({
								value: val.pk,
								label: val.name,
							}))}
							errormsg="Select the supplier."
						/>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};
