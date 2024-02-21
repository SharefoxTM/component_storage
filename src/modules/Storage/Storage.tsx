import axios from "axios";
import { Button } from "../../components/Button";
import Card from "../../components/Card/Card";
import { PutReelModal } from "../../components/Modals/PutReelModal";
import { LocationList } from "../../components/Storage/LocationList";

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
							</div>
							<PutReelModal />
						</Card.CardBody>
					</Card.CardContainer>
				</div>
			</div>
		</>
	);
};
