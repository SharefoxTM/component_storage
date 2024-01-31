import { FieldValues, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { NewPartForm } from "../Form/NewPartForm";
import axios from "axios";
import { Checkbox } from "../Form/Checkbox";
import { useState } from "react";

const postData = (data: FieldValues) => {
	axios
		.post(`${process.env.REACT_APP_BE_HOST}parts/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			(document.getElementById("newPartModal")! as HTMLDialogElement).close();
			const selector = document.getElementById("part")! as HTMLSelectElement;

			const option = document.createElement("option");
			option.value = res.data.pk;
			option.text = res.data.name;
			selector.appendChild(option);
			selector.value = option.value;
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const NewPartModal = () => {
	const newPartMethods = useForm();

	const onCancel = () => {
		newPartMethods.reset();
	};

	const onSubmit = newPartMethods.handleSubmit((data) => {
		data.active = true;
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
		data.virtual = (
			document.getElementById("virtual") as HTMLInputElement
		).checked;

		data.category = data.category.value;
		data.minimum_stock =
			(document.getElementById("minimum_stock") as HTMLInputElement).value || 0;

		postData(data);
	});
	const [moreParts, setMoreParts] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMoreParts(event.target.checked);
	};

	return (
		<Modal
			id="newPartModal"
			title="New part"
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
			<NewPartForm methods={newPartMethods} />
			<div className="modal-action">
				<Checkbox
					handleChange={handleChange}
					id="moreParts"
					label="Create more parts?"
					checked={moreParts}
				/>
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
