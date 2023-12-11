import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { APISupplierPart } from "../../models/APISupplierPart.model";
import { Select } from "./Select";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../Button";

export const NewReelForm = ({
	id,
	methods,
}: {
	id: string;
	methods: UseFormReturn;
}) => {
	const ip = useQuery({
		queryKey: ["ip"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs`)
				.then((res) => res.data),
	});
	const supplierPart = useQuery({
		queryKey: ["sp"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}company/parts/?part=${id}`)
				.then((res) => res.data),
	});
	return (
		<FormProvider {...methods}>
			<form
				id="newReelForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<div className="w-full flex gap-2">
					<Select
						id="newReelSelectIP"
						label={<p>Location *</p>}
						placeholder="Select location..."
						data={ip.data?.map((val: APILocationDetail) => ({
							value: val.pk,
							name: val.name,
						}))}
						width="w-8/12"
						fallback="Please add new storage"
						required
						errormsg="Select the location."
					/>
					<Select
						id="newReelSelectWidth"
						label={<p>Width *</p>}
						placeholder="Select width..."
						data={[
							{ value: 1, name: "1" },
							{ value: 2, name: "2" },
							{ value: 3, name: "3" },
							{ value: 4, name: "4" },
						]}
						width="w-4/12"
						required
						errormsg="Select width."
					/>
				</div>
				<div className="w-full flex gap-2">
					<Select
						id="newReelSelectSP"
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
						placeholder="Select supplier part..."
						data={supplierPart.data?.map((val: APISupplierPart) => ({
							value: val.pk,
							name: val.SKU,
						}))}
						fallback="please add new supplier part"
						required
						errormsg="Please select a supplier part"
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
