import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { APIMovingStock } from "../../models/APIMovingStock.model";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { APISupplierPart } from "../../models/APISupplierPart.model";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";

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

const submitNewReel = (e: React.FormEvent) => {
	const ip = document.getElementById("newReelSelectIP") as HTMLSelectElement;
	if (ip.value === "Select location...") {
	}
};

const setNewSelection = (
	e: React.ChangeEvent<HTMLSelectElement>,
	data: APISupplierPart[],
) => {
	console.log([data, e.currentTarget.value]);
	document
		.getElementById("newReelSKU")!
		.setAttribute(
			"value",
			data[e.currentTarget.value as unknown as number].SKU,
		);
};

const NewReelForm = ({ id }: { id: string }) => {
	const ip = useQuery({
		queryKey: ["ip"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs`)
				.then((res) => res.data),
	});
	const supplierPart = useQuery({
		queryKey: ["sp"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}company/?part=${id}`)
				.then((res) => res.data),
	});
	return (
		<form onSubmit={submitNewReel}>
			<div className="w-full flex gap-2">
				<Select
					id="newReelSelectIP"
					label="Location *"
					placeholder="Select location..."
					data={ip.data?.map((val: APILocationDetail) => ({
						value: val.pk,
						name: val.name,
					}))}
					width="w-8/12"
					fallback="Please add new storage"
				/>
				<Select
					id="newReelSelectWidth"
					label="Width *"
					placeholder="Select..."
					data={[
						{ value: 1, name: "1" },
						{ value: 2, name: "2" },
						{ value: 3, name: "3" },
						{ value: 4, name: "4" },
					]}
					width="w-4/12"
				/>
			</div>
			<div className="w-full flex">
				<Select
					id="newReelSelectSP"
					label="Supplier Part *"
					placeholder="Select supplier part..."
					data={supplierPart.data?.map(
						(val: APISupplierPart, index: number) => ({
							value: index,
							name: val.SKU,
						}),
					)}
					fallback="please add new supplier part"
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setNewSelection(e, supplierPart.data)
					}
				/>
			</div>
			<div className="flex gap-2 w-full">
				<Input
					label="Quantity"
					id="newReelQty"
					type="number"
					placeholder="0"
					width="w-1/2"
				/>
				<Input
					label="SKU"
					id="newReelSKU"
					type="text"
					placeholder="insertSKU"
					width="w-1/2"
				/>
			</div>
		</form>
	);
};

const setSelection = (
	e: React.ChangeEvent<HTMLSelectElement>,
	data: APIMovingStock[],
) => {
	document
		.getElementById("SKUInput")!
		.setAttribute(
			"value",
			data[e.currentTarget.value as unknown as number].supplier_part_SKU,
		);
	document
		.getElementById("QtyInput")!
		.setAttribute(
			"value",
			data[e.currentTarget.value as unknown as number].quantity.toString(),
		);
};

const ReturnReelForm = ({ id }: { id: string }) => {
	const stock = useQuery({
		queryKey: [`reel ${id}`, "reel"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}storage/moving/${id}`)
				.then((res) => res.data),
	});

	if (stock.error) return <p>An error has occurred: {stock.error.message}</p>;
	return (
		<form
			action=""
			method="post"
		>
			<Select
				id="returnReelSelectSP"
				label="Part *"
				placeholder="Select supplier part..."
				data={stock.data?.map((val: APIMovingStock, index: number) => ({
					value: index,
					name: val.supplier_part_SKU,
				}))}
				fallback="Please deselect the return reel option"
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
					setSelection(e, stock.data)
				}
			/>
			<div className="flex gap-2 w-full">
				<Input
					label="Quantity"
					id="QtyInput"
					type="number"
					placeholder="0"
					width="w-1/2"
				/>
				<Input
					label="SKU"
					id="SKUInput"
					type="text"
					placeholder="insertSKU"
					width="w-1/2"
				/>
			</div>
		</form>
	);
};

const PutReelModal = () => {
	const [checked, setChecked] = useState(true);
	const param = useParams();

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
				<ReturnReelForm id={param.partID!} />
			) : (
				<NewReelForm id={param.partID!} />
			)}
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
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>
				<div className="modal-action">
					<form method="dialog">
						<button className="btn">Close</button>
					</form>
				</div>
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
							<button
								className="btn"
								onClick={handleModeClick}
								id="0"
							>
								Normal
							</button>
							<button
								className="btn"
								onClick={handleModeClick}
								id="1"
							>
								Vegas
							</button>
							<button
								className="btn"
								onClick={handleModeClick}
								id="2"
							>
								Knight Rider
							</button>
						</div>
						Controls
						<button
							id={param.partID}
							className="btn"
							onClick={getReel}
						>
							Get reel
						</button>
						<button
							className="btn"
							onClick={() => {
								(
									document.getElementById("putReelModal")! as HTMLDialogElement
								).showModal();
							}}
						>
							Put reel
						</button>
						<PutReelModal />
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
