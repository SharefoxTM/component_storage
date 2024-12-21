import {
	FieldValues,
	FormProvider,
	UseFormReturn,
	useForm,
} from "react-hook-form";
import { Input } from "../Input/Input";
import { Select } from "../Input/Select";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import axios, { AxiosResponse } from "axios";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../Button";
import { APIGetPart } from "../../models/APIGetPart.model";
import { useEffect, useState } from "react";
import { APISupplierPart } from "../../models/APISupplierPart.model";
import { Option } from "../../models/Option.model";
import { useParams } from "react-router-dom";
import { Modal } from "../Modals/Modal";
import { NewSupplierPartForm } from "./NewSupplierPartForm";

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

const postData = (
	data: FieldValues,
	queryClient: QueryClient,
	partID: string,
) => {
	data = {
		part: parseInt(data.part),
		supplier: data.newSP.value,
		SKU: data.SKU,
	};
	axios
		.post(`${process.env.REACT_APP_API_URL}company/parts/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			if (res.status === 200) {
				(
					document.getElementById("newSupplierPartModal")! as HTMLDialogElement
				).close();
				queryClient.refetchQueries({ queryKey: [`supplierpart/${partID}`] });
			}
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const NewReelForm = ({
	id,
	methods,
}: {
	id?: string;
	methods: UseFormReturn;
}) => {
	const queryClient = useQueryClient();
	const methodsSP = useForm();
	const params = useParams();

	const onSubmit = methods.handleSubmit((data) => {
		data.part = params.partID;
		postData(data, queryClient, params.partID!);
	});

	const onCancel = () => {
		methods.reset();
	};

	const [partOption, setPartOption] = useState<Option>();
	const [partID, setPartID] = useState<number | undefined>(
		id !== undefined ? parseInt(id) : undefined,
	);

	const parts = useQuery({
		queryKey: ["parts"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_API_URL}parts/`)
				.then((res: AxiosResponse) => res.data),
		enabled: partID === undefined,
	});

	const supplierPart = useQuery({
		queryKey: [`supplierpart/${partID}`],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_API_URL}company/parts/?part=${partID}`)
				.then((res: AxiosResponse) => res.data),
		enabled: partID !== undefined,
	});

	const ip = useQuery({
		queryKey: ["ip"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_API_URL}location/IPs`)
				.then((res: AxiosResponse) => res.data),
	});

	useEffect(() => {
		if (id === undefined) setPartID(partOption?.value as number);
	}, [id, partOption]);

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
					<div className="form-control w-8/12">
						<div className="label">
							<span className="label-text">Select IP *</span>
						</div>
						<Select
							id="newReelSelectIP"
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
							id="newReelSelectWidth"
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
						<Select
							id="newReelSelectSP"
							methods={methods}
							options={supplierPart.data?.map((val: APISupplierPart) => ({
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
							id="newReelQty"
							type="number"
							placeholder="0"
							required
							errormsg="Please enter a quantity."
						/>
					</div>
				</div>
			</form>
			<Modal
				id="newSupplierPartModal"
				title="New supplier part"
				onCancel={onCancel}
				onSubmit={onSubmit}
				submitTitle="Submit"
			>
				<NewSupplierPartForm methods={methodsSP} />
			</Modal>
		</FormProvider>
	);
};
