import { useParams } from "react-router-dom";
import { Thumbnail } from "../Thumbnail";
import { DropDownSettings } from "./DropdownSettings";
import { StatView } from "../StatView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIGetPart } from "../../models/APIGetPart.model";
import { Progressbar } from "./ProgressBar";
import { PartBadges } from "./PartBadges";
import Card from "../Card/Card";
import { PartNewEditModal } from "../Modals/PartNewEditModal";

export const MainContent = () => {
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");

	const part = useQuery({
		queryKey: [`partView ${param.partID}`],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/${param.partID}`)
				.then((res) => res.data),
	});
	if (part.error) return <p>An error has occurred: {part.error.message}</p>;
	const isLoading = part.isFetching || part.isPending;
	const partData: APIGetPart = part.data;
	return (
		<>
			<Card.CardContainer>
				<Card.CardTitle>
					{!isLoading ? (
						<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
							{partData.name}
						</div>
					) : (
						<div className="skeleton my-2 h-10 w-52 align-middle" />
					)}
					<DropDownSettings />
					<PartNewEditModal part={part} />
				</Card.CardTitle>
				<Card.CardBody>
					<div className="basis-5/12">
						{!isLoading ? (
							<Thumbnail
								src={partData.image}
								size="w-28"
							/>
						) : (
							<>
								<div className="skeleton relative flex">
									<div className="w-28 rounded aspect-square">
										<div className="w-full h-full"></div>
									</div>
								</div>
							</>
						)}

						{!isLoading ? (
							<>
								<PartBadges part={partData} />
								<p className="text-white">Description:</p>
								<p>{partData.description}</p>
							</>
						) : (
							<>
								<div className="skeleton my-2 h-6 w-52 align-middle" />
								<p className="text-white">Description:</p>
								<div className="skeleton my-2 h-10 w-52 align-middle" />
							</>
						)}
					</div>
					<div className="basis-1/12" />

					<div className="stats stats-vertical shadow basis-5/12 overflow-clip">
						<StatView title="Available stock">
							{!isLoading ? (
								partData.unallocated_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Total stock">
							{!isLoading ? (
								partData.total_in_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Allocated stock">
							{!isLoading ? (
								<Progressbar
									value={partData.allocated_to_build_orders}
									max={partData.required_for_build_orders}
								/>
							) : (
								<div className="skeleton h-10 w-full rounded-full position-relative"></div>
							)}
						</StatView>
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
