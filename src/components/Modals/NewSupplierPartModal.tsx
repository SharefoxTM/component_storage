import { FieldValues, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { NewSupplierPartForm } from "../Form/NewSupplierPartForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PartNewEditModal } from "./PartNewEditModal";

const postData = (data: FieldValues) => {
	data = {
		part: parseInt(data.part),
		supplier: data.newSP.value,
		SKU: data.SKU,
	};
	axios
		.post(`${process.env.REACT_APP_BE_HOST}company/parts/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			if (res.status === 200) {
				(
					document.getElementById("newSupplierPartModal")! as HTMLDialogElement
				).close();
				const selector = document.getElementById(
					"newReelSelectSP",
				)! as HTMLSelectElement;

				const option = document.createElement("option");
				option.value = res.data.pk;
				option.text = res.data.SKU;
				selector.appendChild(option);
				selector.value = option.value;
			}
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const NewSupplierPartModal = () => {
	const methods = useForm();
	const params = useParams();

	const onCancel = () => {
		methods.reset();
	};
	const onSubmit = methods.handleSubmit((data) => {
		data.part = params.partID;
		postData(data);
	});

	return (
		<Modal
			id="newSupplierPartModal"
			title="New supplier part"
		>
			<form method="dialog">
				<Button
					size="sm"
					variant="ghost"
					className="btn-circle absolute right-2 top-2"
					onClick={onCancel}
				>
					✕
				</Button>
			</form>
			<NewSupplierPartForm methods={methods} />
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
			<PartNewEditModal refetch={() => {}} />
		</Modal>
	);
};
