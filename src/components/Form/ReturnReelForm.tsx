import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { Select } from "./Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { APIGetPart } from "../../models/APIGetPart.model";
import { useState } from "react";
import { APISupplierPart } from "../../models/APISupplierPart.model";

const enterToTab = (e: React.KeyboardEvent) => {
	if (e.key === "Enter" && !e.getModifierState("Shift")) {
		switch ((e.target as HTMLElement).id) {
			case "returnReelSelectIP":
				document.getElementById("returnReelSelectWidth")?.focus();
				break;
			case "returnReelSelectWidth":
				document.getElementById("returnReelSelectSP")?.focus();
				break;
			case "returnReelSelectSP":
				document.getElementById("returnReelQty")?.focus();
				break;
			case "returnReelQty":
				document.getElementById("returnReelSelectIP")?.focus();
				break;

			default:
				console.log(["This is awkward", (e.target as HTMLElement).id]);
				break;
		}
	}
	e.preventDefault();
};

export const ReturnReelForm = ({
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
	const stock = useQuery({
		queryKey: [`returnReel ${partID}`],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}storage/moving/${partID}`)
				.then((res) => res.data),
		enabled: partID !== undefined,
	});
	const ip = useQuery({
		queryKey: ["ip"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs`)
				.then((res) => res.data),
	});

	return (
		<FormProvider {...methods}>
			<form
				id="returnReelForm"
				onSubmit={(e) => e.preventDefault()}
				onKeyUp={enterToTab}
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
					<div className="form-control w-8/12">
						<div className="label">
							<span className="label-text">Select IP *</span>
						</div>
						<Select
							id="returnReelSelectIP"
							methods={methods}
							options={ip.data?.map((val: APILocationDetail) => ({
								value: val.pk,
								label: val.name,
							}))}
							errormsg="Select the location"
						/>
					</div>
					<div className="form-control w-4/12">
						<div className="label">
							<span className="label-text">Select Width *</span>
						</div>
						<Select
							id="returnReelSelectWidth"
							methods={methods}
							options={[
								{ value: 1, label: "1" },
								{ value: 2, label: "2" },
								{ value: 3, label: "3" },
								{ value: 4, label: "4" },
							]}
							errormsg="Select width"
						/>
					</div>
				</div>
				<div className="w-full flex gap-2">
					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Select Supplier Part *</span>
						</div>
						<Select
							id="returnReelSelectSP"
							methods={methods}
							options={stock.data?.map((val: APISupplierPart) => ({
								value: val.pk,
								label: val.SKU,
							}))}
							errormsg="Select a supplier part"
						/>
					</div>
					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Quantity *</span>
						</div>
						<Input
							id="returnReelQty"
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
