import { FieldValues, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import axios from "axios";
import { PartNewEditForm } from "../Form/PartNewEditForm";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { Option } from "../../models/Option.model";

const sendData = (
	data: FieldValues,
	method: "post" | "update",
	refetch: () => void,
	pk?: string,
) => {
	if (method === "post") {
		axios
			.post(`${process.env.REACT_APP_BE_HOST}parts/`, data, {
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
	const method = useForm();

	const onCancel = () => {
		method.reset();
	};

	const [selectedCategory, setSelectedCategory] = useState<Option>();

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
		let method: "post" | "update" = "post";
		if (part !== undefined) method = "update";
		sendData(data, method, refetch, part?.data?.pk);
	});

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
					<PartNewEditForm methods={method} />
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
		</Modal>
	);
};
