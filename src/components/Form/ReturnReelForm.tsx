import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { APIMovingStock } from "../../models/APIMovingStock.model";
import { Input } from "./Input";
import { Selector } from "./Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { APIGetPart } from "../../models/APIGetPart.model";

const enterToTab = (e: React.KeyboardEvent) => {
	if (e.key === "Enter" && !e.getModifierState("Shift")) {
		switch ((e.target as HTMLElement).id) {
			case "returnReelSelectorIP":
				console.log("This is awkward");
				document.getElementById("returnReelSelectorWidth")?.focus();
				break;
			case "returnReelSelectorWidth":
				document.getElementById("returnReelSelectorSP")?.focus();
				break;
			case "returnReelSelectorSP":
				document.getElementById("returnReelQty")?.focus();
				break;
			case "returnReelQty":
				document.getElementById("returnReelSelectorIP")?.focus();
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
	let partID = id;
	const parts = useQuery({
		queryKey: ["parts"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/`)
				.then((res) => res.data),
	});
	const stock = useQuery({
		queryKey: [partID, "reel"],
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
						name="returnReelSelectIP"
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
						name="returnReelSelectWidth"
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
						name="returnReelSelectSP"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<Selector
									id={field.name}
									label={<p>Supplier Part *</p>}
									data={stock.data?.map((val: APIMovingStock) => ({
										value: val.pk,
										name: val.supplier_part_SKU,
									}))}
									errormsg="Please select a supplier part"
								/>
							);
						}}
					/>
					<Input
						label="Quantity"
						id="returnReelQty"
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
