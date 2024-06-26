import axios from "axios";
import { Button } from "../../components/Button";
import Card from "../../components/Card/Card";
import { LocationList } from "../../components/Storage/LocationList";
import { Modal } from "../../components/Modals/Modal";
import { FieldValues, useForm } from "react-hook-form";
import { NewReelForm } from "../../components/Form/NewReelForm";
import { useParams } from "react-router-dom";
import { DropEvent } from "react-dropzone";
import { PartImportForm } from "../../components/Form/PartImportForm";

const getReel = (e: React.MouseEvent<HTMLElement>) => {
	axios
		.get(`${process.env.REACT_APP_BE_HOST}storage/${e.currentTarget.id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err.message);
		});
};

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

export const Storage = () => {
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
		<>
			<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row justify-center">
				<div className="basis-3/4 md:shrink-0">
					<Card.CardContainer>
						<Card.CardTitle>
							<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
								Storage Controls
							</div>
							<div className="flex flex-row gap-5 items-center me-3">
								<Button
									variant="success"
									size="sm"
									negative
									className="overflow-hidden align-middle"
									onClick={() => {
										(
											document.getElementById(
												"storageNewEditModal",
											)! as HTMLDialogElement
										).showModal();
									}}
								>
									New storage
								</Button>
							</div>
						</Card.CardTitle>
						<Card.CardBody>
							<div className="flex flex-col w-full">
								<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row">
									<div className="basis-1/2 md:shrink-0 gap-2">
										<div className="flex w-full gap-5">
											<Button onClick={getReel}>Get reel</Button>
											<Button
												onClick={() => {
													(
														document.getElementById(
															"putReelModal",
														)! as HTMLDialogElement
													).showModal();
												}}
											>
												Put reel
											</Button>
										</div>
									</div>
								</div>
								<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row mt-2">
									<div className="md:w-full md:shrink-0 gap-2">
										<h1 className="text-white text-lg font-bold">Locations:</h1>
										<div className="flex w-full gap-5">
											<LocationList />
										</div>
									</div>
								</div>
								<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row mt-2">
									<div className="md:w-full md:shrink-0 gap-2">
										<h1 className="text-white text-lg font-bold">Import</h1>
										<div className="flex w-full gap-5">
											<Button
												onClick={() => {
													(
														document.getElementById(
															"partImportModal",
														)! as HTMLDialogElement
													).showModal();
												}}
											>
												Import passive components
											</Button>
										</div>
									</div>
								</div>
							</div>
							<Modal
								id="putReelModal"
								title="Put reel"
								onSubmit={onSubmit}
								onCancel={onCancel}
								submitTitle="Submit"
							>
								<NewReelForm
									id={param.partID}
									methods={methods}
								/>
							</Modal>
							<Modal
								id="partImportModal"
								title="Import parts"
							>
								<PartImportForm onDrop={postData} />
							</Modal>
						</Card.CardBody>
					</Card.CardContainer>
				</div>
			</div>
		</>
	);
};
