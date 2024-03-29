import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { NewReelForm } from "../Form/NewReelForm";
import { Button } from "../Button";
import axios from "axios";
import { NewSupplierPartModal } from "./NewSupplierPartModal";

const postReel = async (data: FieldValues) => {
	data = {
		part: data.part.value,
		ip: data.newReelSelectIP.label,
		width: data.newReelSelectWidth.value,
		sp: data.newReelSelectSP.value,
		qty: data.newReelQty,
	};
	axios
		.post(`${process.env.REACT_APP_BE_HOST}storage/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(() => {
			(document.getElementById("putReelModal")! as HTMLDialogElement).close();
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const PutReelModal = () => {
	const param = useParams();
	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		if (param.partID !== undefined) data.part = { value: param.partID };
		postReel(data);
	});
	const onCancel = () => {
		methods.reset();
	};

	return (
		<Modal
			id="putReelModal"
			title="Put reel"
		>
			<NewReelForm
				id={param.partID}
				methods={methods}
			/>
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
			<NewSupplierPartModal />
		</Modal>
	);
};
