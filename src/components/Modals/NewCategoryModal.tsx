import { FieldValues, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import axios from "axios";
import { NewCategoryForm } from "../Form/NewCategoryForm";
const postData = (data: FieldValues, refetch: () => void) => {
	axios
		.post(`${process.env.REACT_APP_BE_HOST}categories/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			(
				document.getElementById("newCategoryModal")! as HTMLDialogElement
			).close();
			refetch();
		})
		.catch((r) => {
			console.log(r.message);
		});
};
type NewCategoryModalProps = {
	updater: () => void;
};
export const NewCategoryModal = ({ updater }: NewCategoryModalProps) => {
	const newCategoryMethods = useForm();

	const onCancel = () => {
		newCategoryMethods.reset();
	};

	const onSubmit = newCategoryMethods.handleSubmit((data) => {
		if (data.parent.value === undefined) data.parent = null;
		else data.parent = data.parent.value;
		console.log(data);
		postData(data, updater);
	});

	return (
		<Modal
			id="newCategoryModal"
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
			<NewCategoryForm methods={newCategoryMethods} />
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
