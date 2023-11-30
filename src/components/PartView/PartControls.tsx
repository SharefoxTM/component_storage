import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";

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
						<button className="btn">Fetch</button>
						<button className="btn">Put</button>
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
