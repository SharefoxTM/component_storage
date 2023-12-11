import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { ReturnReelForm } from "../Form/ReturnReelForm";
import { NewReelForm } from "../Form/NewReelForm";
import { Button } from "../Button";

export const PutReelModal = () => {
	const [checked, setChecked] = useState(true);
	const param = useParams();
	const methodsNew = useForm();
	const methodsReturn = useForm();

	const onSubmitNew = methodsNew.handleSubmit((data) => {
		console.log(data);
	});
	const onSubmitReturn = methodsReturn.handleSubmit((data) => {
		console.log(data);
	});
	const onCancel = () => {
		methodsNew.reset();
		methodsReturn.reset();
	};

	return (
		<Modal
			id="putReelModal"
			title="Put reel"
		>
			<label className="form-control w-fit max-w-xs">
				<div className="label">
					<span
						className="label-text"
						id="checkbox-label"
					>
						Return reel
					</span>
				</div>
				<input
					type="checkbox"
					className="toggle toggle-primary"
					onChange={() => {
						setChecked(!checked);
						document.getElementById("checkbox-label")!.innerText = checked
							? "New reel"
							: "Return reel";
					}}
					checked={checked}
				/>
			</label>
			{checked ? (
				<ReturnReelForm
					id={param.partID!}
					methods={methodsReturn}
				/>
			) : (
				<NewReelForm
					id={param.partID!}
					methods={methodsNew}
				/>
			)}
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
					onClick={() => (checked ? onSubmitReturn() : onSubmitNew())}
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