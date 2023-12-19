import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { APISupplierPart } from "../../models/APISupplierPart.model";
import { Select } from "./Select";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../Button";
import { APIGetPart } from "../../models/APIGetPart.model";
import { useState } from "react";

const enterToTab = (e: React.KeyboardEvent) => {
	if (e.key === "Enter" && !e.getModifierState("Shift")) {
		switch ((e.target as HTMLElement).id) {
			case "newReelSelectIP":
				document.getElementById("newReelSelectWidth")?.focus();
				break;
			case "newReelSelectWidth":
				document.getElementById("newReelSelectSP")?.focus();
				break;
			case "newReelSelectSP":
				document.getElementById("newReelQty")?.focus();
				break;
			case "newReelQty":
				document.getElementById("newReelSelectIP")?.focus();
				break;

			default:
				break;
		}
	}
	e.preventDefault();
};

export const NewReelForm = ({
	id,
	methods,
}: {
	id?: string;
	methods: UseFormReturn;
}) => {
	const [partID, setPartID] = useState<number | undefined>();
	if (id !== undefined) {
		setPartID(parseInt(id));
	}
	const parts = useQuery({
		queryKey: ["parts"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/`)
				.then((res) => res.data),
	});

	const ip = useQuery({
		queryKey: ["ip"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs`)
				.then((res) => res.data),
	});
	const supplierPart = useQuery({
		queryKey: ["sp", partID],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}company/parts/?part=${partID}`)
				.then((res) => res.data),
		enabled: partID !== undefined,
	});
	console.log(parts.data);
	return (
		<FormProvider {...methods}>
			<form
				id="newReelForm"
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
							<Controller
								control={methods.control}
								defaultValue={[]}
								name="part"
								rules={{ required: true }}
								render={({ field }) => {
									return (
										<Select
											id={field.name}
											isSearchable
											onChange={(newValue, actionMeta) => {
												const { value } = newValue as {
													value: number;
													label: string;
												};
												setPartID(value);
											}}
											data={parts.data?.map((val: APIGetPart) => ({
												value: val.pk,
												label: val.name,
											}))}
											errormsg="Select the part"
										/>
									);
								}}
							/>
						</div>
					</div>
				)}
				<div className="w-full flex gap-2">
					<div className="form-control w-8/12">
						<div className="label">
							<span className="label-text">Select IP *</span>
						</div>
						<Controller
							control={methods.control}
							defaultValue={[]}
							name="newReelSelectIP"
							rules={{ required: true }}
							render={({ field }) => {
								return (
									<Select
										id={field.name}
										data={ip.data?.map((val: APILocationDetail) => ({
											value: val.pk,
											label: val.name,
										}))}
										errormsg="Select the location."
									/>
								);
							}}
						/>
					</div>
					<div className="form-control w-4/12">
						<div className="label">
							<span className="label-text">Select Width *</span>
						</div>
						<Controller
							control={methods.control}
							defaultValue={[]}
							name="newReelSelectWidth"
							rules={{ required: true }}
							render={({ field }) => {
								return (
									<Select
										id={field.name}
										data={[
											{ value: 1, label: "1" },
											{ value: 2, label: "2" },
											{ value: 3, label: "3" },
											{ value: 4, label: "4" },
										]}
										errormsg="Select width."
									/>
								);
							}}
						/>
					</div>
				</div>
				<div className="w-full flex gap-2">
					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Select Supplier Part * </span>
							<Button
								variant="success"
								size="xs"
								negative
								className="ml-2 overflow-hidden"
								onClick={() => {
									(
										document.getElementById(
											"newSupplierPartModal",
										)! as HTMLDialogElement
									).showModal();
								}}
							>
								+
							</Button>
						</div>
						<Controller
							control={methods.control}
							defaultValue={[]}
							name="newReelSelectSP"
							rules={{ required: true }}
							render={({ field }) => {
								return (
									<Select
										id={field.name}
										isSearchable
										data={supplierPart.data?.map((val: APISupplierPart) => ({
											value: val.pk,
											label: val.SKU,
										}))}
										errormsg="Please select a supplier part"
									/>
								);
							}}
						/>
					</div>
					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Quantity *</span>
						</div>
						<Input
							id="newReelQty"
							type="number"
							placeholder="0"
							required
							errormsg="Please enter a quantity."
						/>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};
