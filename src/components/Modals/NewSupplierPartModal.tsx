import { useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { NewSupplierPartForm } from "../Form/NewSupplierPartForm";
import { useParams } from "react-router-dom";

export const NewSupplierPartModal = () => {
	const methods = useForm();
	const params = useParams();

	const onCancel = () => {
		methods.reset();
	};

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
			<NewSupplierPartForm
				id={params.PartID!}
				methods={methods}
			/>
			<div className="modal-action">
				<Button variant="success">Submit</Button>
				<form method="dialog">
					<Button onClick={onCancel}>Cancel</Button>
				</form>
			</div>
		</Modal>
	);
};
