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
						<button className="btn">Get reel</button>
						<button
							className="btn"
							onClick={() =>
								(
									document.getElementById("putReelModal")! as HTMLDialogElement
								).showModal()
							}
						>
							Put reel
						</button>
						<dialog
							id="putReelModal"
							className="modal"
						>
							<div className="modal-box">
								<h3 className="font-bold text-lg">Put reel</h3>
								<form
									action=""
									method="post"
								>
									<label className="form-control w-full max-w-xs">
										<div className="label">
											<span className="label-text">Part *</span>
										</div>
										<select className="select select-bordered">
											<option
												disabled
												selected
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
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
