import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import { Button } from "../Button";
import { PutReelModal } from "../Modals/PutReelModal";
import { ReturnReelModal } from "../Modals/ReturnReelModal";

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
						<PutReelModal />
						<ReturnReelModal />
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
