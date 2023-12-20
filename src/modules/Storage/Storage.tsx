import axios from "axios";
import { Button } from "../../components/Button";
import Card from "../../components/Card/Card";
import { PutReelModal } from "../../components/Modals/PutReelModal";
import { LocationList } from "../../components/Storage/LocationList";

const handleModeClick = (e: React.MouseEvent<HTMLElement>) => {
	const data = JSON.stringify({
		mode: e.currentTarget.id,
		ip: "172.17.6.6",
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

const getReel = (e: React.MouseEvent<HTMLElement>) => {
	axios
		.get(`${process.env.REACT_APP_BE_HOST}storage/${e.currentTarget.id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err.message);
		});
};

export const Storage = () => {
	return (
		<>
			<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row justify-center">
				<div className="basis-3/4 md:shrink-0">
					<Card.CardContainer>
						<Card.CardTitle>
							<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
								Storage Controls
							</div>
						</Card.CardTitle>
						<Card.CardBody>
							<div className="flex flex-col w-full">
								<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row">
									<div className="basis-1/2 md:shrink-0 gap-2 border-e-2">
										<h1 className="text-white text-lg font-bold">Mode:</h1>
										<div className="flex w-full gap-5">
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
									</div>
									<div className="basis-1/2 md:shrink-0 gap-2 border-s-2 pl-5">
										<h1 className="text-white text-lg font-bold">Controls:</h1>
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
							</div>
							<PutReelModal />
						</Card.CardBody>
					</Card.CardContainer>
				</div>
			</div>
		</>
	);
};
