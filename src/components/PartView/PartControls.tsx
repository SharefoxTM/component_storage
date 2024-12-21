import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import { Button } from "../Button";
import { Modal } from "../Modals/Modal";
import { FieldValues, useForm } from "react-hook-form";
import { NewReelForm } from "../Form/NewReelForm";
import { ReturnReelForm } from "../Form/ReturnReelForm";

const getReel = (e: React.MouseEvent<HTMLElement>) => {
	axios
		.get(`${process.env.REACT_APP_API_URL}storage/${e.currentTarget.id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err.message);
		});
};

const postReel = async (data: FieldValues) => {
	console.log("posting");
	data = {
		part: data.part.value,
		ip: data.newReelSelectIP.label,
		width: data.newReelSelectWidth.value,
		sp: data.newReelSelectSP.value,
		qty: data.newReelQty,
	};
	axios
		.post(`${process.env.REACT_APP_API_URL}storage/`, data, {
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

export const PartControls = () => {
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");
	const paramPutReel = useParams();
	const methods = useForm();
	const methodsReturnReel = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		if (param.partID !== undefined) data.part = { value: param.partID };
		postReel(data);
	});

	const onCancel = () => {
		methods.reset();
	};

	const onSubmitReturnReel = methodsReturnReel.handleSubmit((data) => {
		postReel(data);
		methodsReturnReel.reset();
	});
	const onCancelReturnReel = () => {
		methodsReturnReel.reset();
	};

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
						<div className="w-full flex flex-col space-y-2 flex-shrink-0">
							<Button
								id={`${param.partID}_Moving`}
								onClick={getReel}
								className="text-white"
							>
								Get reel for self
							</Button>
							<Button
								id={`${param.partID}_PNP`}
								onClick={getReel}
								className="text-white"
							>
								Get reel for PNP
							</Button>
							<div className="h-9"></div>
							<Button
								onClick={() => {
									(
										document.getElementById(
											"putReelModal",
										)! as HTMLDialogElement
									).showModal();
								}}
								className="text-white"
							>
								Put reel
							</Button>
							<Button
								onClick={() => {
									(
										document.getElementById(
											"returnReelModal",
										)! as HTMLDialogElement
									).showModal();
								}}
								className="text-white"
							>
								Return reel
							</Button>
						</div>
						<Modal
							id="putReelModal"
							title="Put reel"
							onSubmit={onSubmit}
							onCancel={onCancel}
							submitTitle="Submit"
						>
							<NewReelForm
								id={paramPutReel.partID}
								methods={methods}
							/>
						</Modal>
						<Modal
							id="returnReelModal"
							title="Return reel"
							onSubmit={onSubmitReturnReel}
							onCancel={onCancelReturnReel}
							submitTitle="Submit"
						>
							<ReturnReelForm methods={methodsReturnReel} />
						</Modal>
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
