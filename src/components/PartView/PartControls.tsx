import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import { Button } from "../Button";
import { PutReelModal } from "../Modals/PutReelModal";

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
