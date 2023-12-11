import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import { useState } from "react";
import { Button } from "../Button";
import { ReturnReelForm } from "../Form/ReturnReelForm";
import { NewReelForm } from "../Form/NewReelForm";
import { useForm } from "react-hook-form";

const handleModeClick = (e: React.MouseEvent<HTMLElement>) => {
	const data = JSON.stringify({
		mode: e.currentTarget.id,
	});
	axios
		.post(`${process.env.REACT_APP_BE_HOST}storage/mode/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => res.data)
		.catch((r) => {
			console.log(r.message);
		});
};

const PutReelModal = () => {
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

type ModalProps = {
	id: string;
	title: string;
	children?: React.ReactNode;
};
const Modal = ({ id, title, children }: ModalProps) => {
	return (
		<dialog
			id={id}
			className="modal"
		>
			<div className="modal-box">
				<h3 className="font-bold text-lg">{title}</h3>
				{children}
			</div>
		</dialog>
	);
};

const getReel = (e: React.MouseEvent<HTMLElement>) => {
	axios
		.get(`${process.env.REACT_APP_BE_HOST}storage/${e.currentTarget.id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err.message);
		});
};

export const PartControls = () => {
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");
	return (
		<>
			<Card.CardContainer>
				<Card.CardTitle>
					<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
						Part stock controls
					</div>
				</Card.CardTitle>
				<Card.CardBody>
					<div className="flex flex-col gap-3 justify-center w-full">
						<p>Mode</p>
						<div className="flex w-full justify-evenly">
							<Button
								onClick={handleModeClick}
								id="0"
							>
								Normal
							</Button>
							<Button
								onClick={handleModeClick}
								id="1"
							>
								Vegas
							</Button>
							<Button
								onClick={handleModeClick}
								id="2"
							>
								Knight Rider
							</Button>
						</div>
						Controls
						<Button
							id={param.partID}
							onClick={getReel}
						>
							Get reel
						</Button>
						<Button
							onClick={() => {
								(
									document.getElementById("putReelModal")! as HTMLDialogElement
								).showModal();
							}}
						>
							Put reel
						</Button>
						<PutReelModal />
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
