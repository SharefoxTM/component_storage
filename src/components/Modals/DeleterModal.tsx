import { useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { DeleterForm } from "../Form/DeleterForm";
import axios from "axios";

type DeleterModalProps = {
	item: any;
	type: "categories" | "parts" | "storage" | "location" | "company" | "file";
};
const deleteItem = ({ item, type }: DeleterModalProps) => {
	axios
		.delete(`${process.env.REACT_APP_BE_HOST}${type}/${item.pk}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			if (res.status === 201) {
				(document.getElementById("deleterModal")! as HTMLDialogElement).close();
			}
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const DeleterModal = ({ item, type }: DeleterModalProps) => {
	const method = useForm();

	const onCancel = () => {
		method.reset();
	};

	const onSubmit = method.handleSubmit((data) => {
		if (data.name === item.name) {
			deleteItem({ item, type });
		}
	});

	return (
		<Modal
			id="deleterModal"
			title="Delete"
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
			<DeleterForm
				methods={method}
				name={item.name as string}
			/>
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
