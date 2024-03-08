import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { Select } from "./Select";

export const ReturnReelForm = ({ methods }: { methods: UseFormReturn }) => {
	const ip = useQuery({
		queryKey: ["ip"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs`)
				.then((res: AxiosResponse) => res.data),
	});

	return (
		<FormProvider {...methods}>
			<form
				id="returnReelForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<div className="w-full flex gap-2">
					<div className="form-control w-8/12">
						<div className="label">
							<span className="label-text">Select IP *</span>
						</div>
						<Select
							id="IP"
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
							id="Width"
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
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text">Scan QR-Code *</span>
					</div>
					<Input
						id="QR"
						type="text"
						placeholder="QR-Code"
						required
						errormsg="Please scan the QR-code"
					/>
				</div>
			</form>
		</FormProvider>
	);
};
