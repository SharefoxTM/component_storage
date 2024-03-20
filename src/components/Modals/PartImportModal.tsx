import { Modal } from "./Modal";
import { Button } from "../Button";
import axios from "axios";
import { PartNewEditModal } from "./PartNewEditModal";
import { PartImportForm } from "../Form/PartImportForm";
import { DropEvent } from "react-dropzone";

const postData = (files: File[], event: DropEvent) => {
	let body = new FormData();
	body.append("type", "Excel import");
	body.append("category", "passives");
	body.append("file", files[0]);

	axios
		.post(`${process.env.REACT_APP_BE_HOST}file/parts/`, body, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => {
			if (res.status === 201) {
				(
					document.getElementById("partImportModal")! as HTMLDialogElement
				).close();
			}
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const PartImportModal = () => {
	return (
		<Modal
			id="partImportModal"
			title="Import parts"
		>
			<form method="dialog">
				<Button
					size="sm"
					variant="ghost"
					className="btn-circle absolute right-2 top-2"
				>
					✕
				</Button>
			</form>
			<PartImportForm onDrop={postData} />
			<div className="modal-action">
				<form method="dialog">
					<Button>Cancel</Button>
				</form>
			</div>
			<PartNewEditModal />
		</Modal>
	);
};
