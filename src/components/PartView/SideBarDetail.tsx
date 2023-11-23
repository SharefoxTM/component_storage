import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { APIPartParameter } from "../../models/APIPartParameter.model";

const SideDetailTableHeader = ({ topic }: { topic: string }) => {
	switch (topic) {
		case "Parameters":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Stock":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Qty</th>
					<th>Allocated</th>
					<th>Expiry Date</th>
					<th>Location</th>
				</>
			);
		case "Build Orders":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Used In":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Pricing":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Suppliers":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Purchase Orders":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Scheduling":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Related Parts":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);
		case "Attachments":
			return (
				<>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Data</th>
					<th>Units</th>
				</>
			);

		default:
			return (
				<>
					<th>No/wrong topic!</th>
				</>
			);
	}
};

const GetSideDetailContent = ({ topic }: { topic: string }) => {
	const param = useParams();
	const { isPending, isFetching, data } = useQuery({
		queryKey: ["details"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/${param.partID}/${topic}`)
				.then((res) => res.data),
	});
	let parameters: APIPartParameter[];
	if (topic === "Parameters") {
		parameters = data;
	}
	const isLoading = isFetching || isPending;
	return (
		<>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<SideDetailTableHeader topic={topic} />
					</thead>
					<tbody>
						{isLoading ? (
							<td>Still loading...</td>
						) : (
							<>
								{topic === "Parameters" &&
									parameters!.map((temp: APIPartParameter) => (
										<>
											<tr>
												<th></th>
												<td>{temp.template_detail.name}</td>
												<td>{temp.template_detail.description}</td>
												<td>{temp.data}</td>
												<td>{temp.template_detail.units}</td>
											</tr>
										</>
									))}
							</>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export const PartViewSideDetail = ({ topic }: { topic: string }) => {
	return (
		<>
			<Card.CardContainer>
				<Card.CardTitle>{topic}</Card.CardTitle>
				<Card.CardBody>
					<GetSideDetailContent topic={topic} />
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
