import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import axios, { AxiosResponse } from "axios";
import { PartNewEditForm } from "../Form/PartNewEditForm";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { Option } from "../../models/Option.model";
import { Checkbox } from "../Form/Checkbox";
import { NavigateFunction, useNavigate } from "react-router-dom";

const onContinue = (method: UseFormReturn) => {
	method.resetField("name");
	method.resetField("minimum_stock");
	method.resetField("description");
	method.resetField("active");
	method.resetField("assembly");
	method.resetField("component");
	method.resetField("is_template");
	method.resetField("purchaseable");
	method.resetField("salable");
	method.resetField("trackable");
	method.resetField("virtual");
};

const sendData = (
	data: FieldValues,
	formReturn: UseFormReturn,
	method: "post" | "update",
	refetch: () => void,
	moreParts: boolean,
	nav: NavigateFunction,
	pk?: string,
) => {
	if (method === "post") {
		axios
			.post(`${process.env.REACT_APP_BE_HOST}parts/`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res: AxiosResponse) => {
				if (!moreParts) {
					(
						document.getElementById("partNewEditModal")! as HTMLDialogElement
					).close();
					nav(`/part/${res.data.pk}`);
				} else {
					onContinue(formReturn);
				}
			})
			.catch((r) => {
				console.log(r.message);
			});
	} else {
		console.log(data);
		axios
			.put(`${process.env.REACT_APP_BE_HOST}parts/${pk}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				(
					document.getElementById("partNewEditModal")! as HTMLDialogElement
				).close();
				refetch();
			})
			.catch((r) => {
				console.log(r.message);
			});
	}
};

type DataProps = {
	pk: string;
	active: boolean;
	assembly: boolean;
	component: boolean;
	is_template: boolean;
	purchaseable: boolean;
	salable: boolean;
	trackable: boolean;
	virtual: boolean;
	name: string;
	category: number;
	minimum_stock: number;
	description: string;
};

export const PartNewEditModal = ({
	part,
	refetch,
}: {
	part?: UseQueryResult<DataProps, any>;
	refetch: () => void;
}) => {
	const [moreParts, setMoreParts] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<Option>();

	const method = useForm();
	const nav = useNavigate();

	const onSubmit = method.handleSubmit((data) => {
		data.active = (
			document.getElementById("active") as HTMLInputElement
		).checked;
		data.assembly = (
			document.getElementById("assembly") as HTMLInputElement
		).checked;
		data.component = (
			document.getElementById("component") as HTMLInputElement
		).checked;
		data.is_template = (
			document.getElementById("is_template") as HTMLInputElement
		).checked;
		data.purchaseable = (
			document.getElementById("purchaseable") as HTMLInputElement
		).checked;
		data.salable = (
			document.getElementById("salable") as HTMLInputElement
		).checked;
		data.trackable = (
			document.getElementById("trackable") as HTMLInputElement
		).checked;
		data.virtual = (
			document.getElementById("virtual") as HTMLInputElement
		).checked;

		data.category = selectedCategory!.value;
		data.minimum_stock =
			parseInt(
				(document.getElementById("minimum_stock") as HTMLInputElement).value,
			) || 0;
		let methodREST: "post" | "update" = "post";
		if (part !== undefined) methodREST = "update";
		sendData(data, method, methodREST, refetch, moreParts, nav, part?.data?.pk);
		if (moreParts) {
			setSelectedCategory(selectedCategory);
		}
	});

	const onCancel = () => {
		method.reset();
		setSelectedCategory({ value: "undefined", label: "Select..." });
	};

	return (
		<Modal
			id="partNewEditModal"
			title={(part !== undefined ? "Edit" : "New") + " part"}
		>
			<form method="dialog">
				<Button
					size="sm"
					variant="ghost"
					className="btn-circle absolute right-3 top-3"
					onClick={onCancel}
				>
					✕
				</Button>
			</form>
			{part === undefined && (
				<>
					<PartNewEditForm
						methods={method}
						setter={setSelectedCategory}
					/>
				</>
			)}
			{part !== undefined && (
				<>
					<PartNewEditForm
						methods={method}
						data={part?.data}
						isLoading={part.isLoading}
						setter={setSelectedCategory}
					/>
				</>
			)}
			<div className="modal-action">
				<div className="flex flex-row gap-2 w-full items-end">
					<div className="flex flex-col">
						{part === undefined && (
							<Checkbox
								handleChange={(event) => setMoreParts(event.target.checked)}
								id="moreParts"
								label="Create more parts?"
								checked={moreParts}
							/>
						)}
					</div>
					<div className="flex-grow"></div>
					<Button
						variant="success"
						onClick={onSubmit}
					>
						Submit
					</Button>
					<form method="dialog">
						<Button onClick={onCancel}>Cancel</Button>
					</form>
				</div>
			</div>
		</Modal>
	);
};
