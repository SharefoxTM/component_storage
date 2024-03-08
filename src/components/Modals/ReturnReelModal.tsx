import { FieldValues, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import axios from "axios";
import { ReturnReelForm } from "../Form/ReturnReelForm";

const postReel = async (data: FieldValues) => {
	data = {
		ip: data.IP.label,
		width: data.Width.value,
		qr: JSON.parse(data.QR).stockitem,
	};
	axios
		.patch(`${process.env.REACT_APP_BE_HOST}storage/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(() => {
			(
				document.getElementById("returnReelModal")! as HTMLDialogElement
			).close();
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const ReturnReelModal = () => {
	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		postReel(data);
		methods.reset();
	});
	const onCancel = () => {
		methods.reset();
	};

	return (
		<Modal
			id="returnReelModal"
			title="Return reel"
		>
			<ReturnReelForm methods={methods} />
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
		</Modal>
	);
};
