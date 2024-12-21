import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "../Input/Input";
import { Select } from "../Input/Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APISupplierDetail } from "../../models/APISupplierDetail.model";
import { useEffect, useState } from "react";
import { APIGetPart } from "../../models/APIGetPart.model";
import { Button } from "../Button";
import { Option } from "../../models/Option.model";

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
	const [partOption, setPartOption] = useState<Option>();
	const [partID, setPartID] = useState<number | undefined>(
		id !== undefined ? parseInt(id) : undefined,
	);
	const parts = useQuery({
		queryKey: ["parts"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_API_URL}parts/`)
				.then((res) => res.data),
		enabled: partID === undefined,
	});

	const suppliers = useQuery({
		queryKey: ["newSupplierForm"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_API_URL}company/suppliers/`)
				.then((res) => res.data),
	});

	useEffect(() => {
		setPartID(partOption?.value as number);
	}, [partOption]);
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
								<Button
									variant="success"
									size="xs"
									negative
									className="ml-2 overflow-hidden"
									onClick={() => {
										(
											document.getElementById(
												"partNewEditModal",
											)! as HTMLDialogElement
										).showModal();
									}}
								>
									+
								</Button>
							</div>
							<Select
								id="part"
								methods={methods}
								setter={setPartOption}
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
							<Button
								variant="success"
								size="xs"
								negative
								className="ml-2 overflow-hidden"
								onClick={() => {
									(
										document.getElementById(
											"newSupplierModal",
										)! as HTMLDialogElement
									).showModal();
								}}
							>
								+
							</Button>
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
