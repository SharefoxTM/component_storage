import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { APISupplierPart } from "../../models/APISupplierPart.model";
import { Selector } from "./Select";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../Button";
import { APIGetPart } from "../../models/APIGetPart.model";

const enterToTab = (e: React.KeyboardEvent) => {
	if (e.key === "Enter" && !e.getModifierState("Shift")) {
		switch ((e.target as HTMLElement).id) {
			case "newReelSelectorIP":
				document.getElementById("newReelSelectorWidth")?.focus();
				break;
			case "newReelSelectorWidth":
				document.getElementById("newReelSelectorSP")?.focus();
				break;
			case "newReelSelectorSP":
				document.getElementById("newReelQty")?.focus();
				break;
			case "newReelQty":
				document.getElementById("newReelSelectorIP")?.focus();
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
	let partID = id;
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
						<Controller
							control={methods.control}
							defaultValue={[]}
							name="part"
							rules={{ required: true }}
							render={({ field }) => {
								return (
									<Selector
										id={field.name}
										label={<p>Select part *</p>}
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
				)}
				<div className="w-full flex gap-2">
					<Controller
						control={methods.control}
						defaultValue={[]}
						name="newReelSelectIP"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<Selector
									id={field.name}
									label={<p>Location *</p>}
									data={ip.data?.map((val: APILocationDetail) => ({
										value: val.pk,
										label: val.name,
									}))}
									width="w-8/12"
									errormsg="Select the location."
								/>
							);
						}}
					/>
					<Controller
						control={methods.control}
						defaultValue={[]}
						name="newReelSelectWidth"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<Selector
									id={field.name}
									label={<p>Width *</p>}
									data={[
										{ value: 1, label: "1" },
										{ value: 2, label: "2" },
										{ value: 3, label: "3" },
										{ value: 4, label: "4" },
									]}
									width="w-4/12"
									errormsg="Select width."
								/>
							);
						}}
					/>
				</div>
				<div className="w-full flex gap-2">
					<Controller
						control={methods.control}
						defaultValue={[]}
						name="newReelSelectSP"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<Selector
									id={field.name}
									label={
										<p>
											Supplier Part *
											<Button
												variant="success"
												size="xs"
												negative
												className="ml-2"
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
										</p>
									}
									data={supplierPart.data?.map((val: APISupplierPart) => ({
										value: val.pk,
										name: val.SKU,
									}))}
									errormsg="Please select a supplier part"
								/>
							);
						}}
					/>
					<Input
						label="Quantity"
						id="newReelQty"
						type="number"
						placeholder="0"
						width="w-1/2"
						required
						errormsg="Please enter a quantity."
					/>
				</div>
			</form>
		</FormProvider>
	);
};
