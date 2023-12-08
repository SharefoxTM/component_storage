import { FormProvider, UseFormReturn } from "react-hook-form";
import { APIMovingStock } from "../../models/APIMovingStock.model";
import { Input } from "./Input";
import { Select } from "./Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";

export const ReturnReelForm = ({
	id,
	methods,
}: {
	id: string;
	methods: UseFormReturn;
}) => {
	const stock = useQuery({
		queryKey: [`reel ${id}`, "reel"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}storage/moving/${id}`)
				.then((res) => res.data),
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
				noValidate
			>
				<div className="w-full flex gap-2">
					<Select
						id="newReelSelectIP"
						label="Location *"
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
						label="Width *"
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
						id="returnReelSelectSP"
						label="Supplier Part *"
						placeholder="Select supplier part..."
						data={stock.data?.map((val: APIMovingStock, index: number) => ({
							value: index,
							name: val.supplier_part_SKU,
						}))}
						fallback="Please deselect the return reel option"
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
