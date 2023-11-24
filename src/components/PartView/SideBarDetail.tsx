import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { APIPartParameter } from "../../models/APIPartParameter.model";
import { APIPartStock } from "../../models/APIPartStock.model";
import { Badge } from "../Badge";

const SideDetailTableHeader = ({ topic }: { topic: string }) => {
	switch (topic) {
		case "Parameters":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Stock":
			return (
				<>
					<tr>
						<th></th>
						<th>Status</th>
						<th>Location</th>
						<th>Quantity</th>
						<th>Allocated quantity</th>
						<th>Supplier part</th>
						<th>Price</th>
						<th>Expiry Date</th>
					</tr>
				</>
			);
		case "Build Orders":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Used In":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Pricing":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Suppliers":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Purchase Orders":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Scheduling":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Related Parts":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);
		case "Attachments":
			return (
				<>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Data</th>
						<th>Units</th>
					</tr>
				</>
			);

		default:
			return (
				<>
					<tr>
						<th>No/wrong topic!</th>
					</tr>
				</>
			);
	}
};
const getStatusBadgeVariant = (
	status: 10 | 50 | 55 | 60 | 65 | 70 | 75 | 85,
): "success" | "warning" | "error" => {
	switch (status) {
		case 10:
			return "success";
		case 50:
		case 55:
		case 85:
			return "warning";
		case 60:
		case 65:
		case 70:
		case 75:
			return "error";

		default:
			throw new Error("Unknown status code");
	}
};

const ParametersTable = ({ data }: { data: APIPartParameter[] }) => {
	return (
		<>
			{data.map((param, key) => (
				<tr key={key}>
					<th></th>
					<td>{param.template_detail.name}</td>
					<td>{param.template_detail.description}</td>
					<td>{param.data}</td>
					<td>{param.template_detail.units}</td>
				</tr>
			))}
		</>
	);
};

const StockTable = ({ data }: { data: APIPartStock[] }) => {
	return (
		<>
			{data!.map((stock, key) => (
				<tr key={key}>
					<th></th>
					<td>
						<Badge variant={getStatusBadgeVariant(stock.status)}>
							{stock.status_text}
						</Badge>
					</td>
					<td>{stock.location}</td>
					<td>{stock.quantity}</td>
					<td>{stock.allocated}</td>
					<td>{stock.supplier_part}</td>
					<td>
						{stock.purchase_price} {stock.purchase_price_currency}
					</td>
					<td>
						{stock.expiry_date}
						{(stock.expired || stock.stale) && (
							<>
								{stock.expired && <Badge variant="error">Expired!</Badge>}
								{stock.stale && <Badge variant="error">Stale!</Badge>}
							</>
						)}
					</td>
				</tr>
			))}
		</>
	);
};

// const BuildOrdersTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

// const UsedInTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

// const PricingTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

// const SuppliersTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

// const PurchaseOrdersTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

// const SchedulingTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

// const RelatedPartsTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

// const AttachmentsTable = ({data}:{data:APIPartParameter[]}) => {
// 	return data!.map((temp: APIPartParameter) => (
// 		<>
// 			<tr>
// 				<th></th>
// 				<td>{temp.template_detail.name}</td>
// 				<td>{temp.template_detail.description}</td>
// 				<td>{temp.data}</td>
// 				<td>{temp.template_detail.units}</td>
// 			</tr>
// 		</>
// 	))
// };

const GetSideDetailContent = ({ topic }: { topic: string }) => {
	const param = useParams();
	const { isPending, isFetching, data } = useQuery({
		queryKey: [topic],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/${param.partID}/${topic}`)
				.then((res) => res.data),
	});

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
							<tr>
								<td>Loading...</td>
							</tr>
						) : (
							<>
								{topic === "Parameters" && <ParametersTable data={data} />}
								{topic === "Stock" && <StockTable data={data} />}
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
				<Card.CardTitle>
					<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
						{topic}
					</div>
				</Card.CardTitle>
				<Card.CardBody>
					<GetSideDetailContent topic={topic} />
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
