import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { APIMovingStock } from "../../models/APIMovingStock.model";

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

const NewReelForm = ({ id }: { id: string }) => {
	const { isLoading, data } = useQuery({
		queryKey: [`reel ${id}`],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/reel/new/${id}`)
				.then((res) => res.data),
	});
	return (
		<form
			action=""
			method="post"
		>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Part *</span>
				</div>
				<select
					className="select select-bordered"
					defaultValue={0}
				>
					<option
						disabled
						value={0}
					>
						Select part...
					</option>
					<option>Star Wars</option>
					<option>Harry Potter</option>
					<option>Lord of the Rings</option>
					<option>Planet of the Apes</option>
					<option>Star Trek</option>
				</select>
			</label>
			<div className="flex gap-2 w-full">
				<label className="form-control w-1/2 max-w-xs">
					<div className="label">
						<span className="label-text">Quantity</span>
					</div>
					<input
						type="number"
						placeholder="0"
						className="input input-bordered w-full max-w-xs"
					/>
				</label>
				<label className="form-control w-1/2 max-w-xs">
					<div className="label">
						<span className="label-text">MPN</span>
					</div>
					<input
						type="text"
						placeholder="insert MPN"
						className="input input-bordered w-full max-w-xs"
					/>
				</label>
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
	const { isFetching, isPending, data, error } = useQuery({
		queryKey: [`reel ${id}`, "reel"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}storage/moving/${id}`)
				.then((res) => res.data),
	});

	if (error) return <p>An error has occurred: {error.message}</p>;
	const stock: APIMovingStock[] = data;
	const isLoading = isFetching || isPending;
	return (
		<form
			action=""
			method="post"
		>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Part *</span>
				</div>
				<select
					className="select select-bordered"
					defaultValue={"none"}
					onChange={(e) => setSelection(e, data)}
				>
					<option
						disabled
						value="none"
					>
						Select supplier part...
					</option>
					{isLoading && (
						<>
							<option
								className="skeleton"
								disabled
							>
								Loading parts
							</option>
						</>
					)}
					{!isLoading && (
						<>
							{stock.length !== 0 &&
								stock.map((e, key) => (
									<option
										key={key}
										value={key}
									>
										{e.supplier_part_SKU}
									</option>
								))}
							{stock.length === 0 && (
								<>
									<option disabled>No reels are moving.</option>
									<option disabled>
										Please deselect the return reel option.
									</option>
								</>
							)}
						</>
					)}
				</select>
			</label>
			<div className="flex gap-2 w-full">
				<label className="form-control w-1/2 max-w-xs">
					<div className="label">
						<span className="label-text">Quantity</span>
					</div>
					<input
						id="QtyInput"
						type="number"
						placeholder="0"
						className="input input-bordered w-full max-w-xs"
					/>
				</label>
				<label className="form-control w-1/2 max-w-xs">
					<div className="label">
						<span className="label-text">SKU</span>
					</div>
					<input
						id="SKUInput"
						type="text"
						placeholder="insert MPN"
						className="input input-bordered w-full max-w-xs"
					/>
				</label>
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
