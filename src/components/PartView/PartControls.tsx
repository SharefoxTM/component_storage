import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Card from "../Card/Card";

export const PartControls = () => {
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");

	const { isPending, isFetching, data, error } = useQuery({
		queryKey: ["shelve"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}shelves/ping`)
				.then((res) => res.data),
	});
	const isLoading = isFetching || isPending;
	return (
		<>
			<Card.CardContainer>
				<Card.CardTitle>
					<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
						Part stock controls
					</div>
				</Card.CardTitle>
				<Card.CardBody>
					{isLoading && (
						<div>Trying to establish connection to the shelves</div>
					)}
					{!isLoading && (
						<>
							{error && <div>Could not establish a connection</div>}
							{!error && <></>}
						</>
					)}
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
