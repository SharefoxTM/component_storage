import { useParams } from "react-router-dom";
import { Thumbnail } from "../Thumbnail";
import { DropDownSettings } from "./DropdownSettings";
import { StatView } from "../StatView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIGetPart } from "../../models/APIGetPart.model";
import { Progressbar } from "./ProgressBar";
import { PartBadges } from "./PartBadges";

export const MainContent = () => {
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");

	const { isPending, isFetching, error, data } = useQuery({
		queryKey: ["parts"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/${param.partID}`)
				.then((res) => res.data),
	});
	if (error) return <p>An error has occurred: {error.message}</p>;
	const isLoading = isFetching || isPending;
	const part: APIGetPart = data;
	return (
		<>
			<div className="card shadow-xl bg-gray-800 rounded-box flex md:flex-none justify-between my-2">
				<div className="w-full">
					<div className="flex flex-wrap items-center justify-between border-b border-gray-500 rounded-t-lg pl-4">
						{!isLoading ? (
							<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
								{part.name}
							</div>
						) : (
							<div className="skeleton my-2 h-10 w-52 align-middle" />
						)}
						<DropDownSettings />
					</div>
				</div>
				<div className="p-4 flex flex-col md:flex-none md:flex-row justify-between w-full">
					<div className="basis-5/12">
						<Thumbnail
							id={parseInt(param.partID!)}
							size="w-28"
						/>
						{!isLoading ? (
							<>
								<PartBadges part={part} />
								<p className="text-white">Description:</p>
								<p>{part.description}</p>
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
								part.unallocated_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Total stock">
							{!isLoading ? (
								part.total_in_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Allocated stock">
							{!isLoading ? (
								<Progressbar
									value={part.allocated_to_build_orders}
									max={part.required_for_build_orders}
								/>
							) : (
								<div className="skeleton h-10 w-full rounded-full position-relative"></div>
							)}
						</StatView>
					</div>
				</div>
			</div>
		</>
	);
};
