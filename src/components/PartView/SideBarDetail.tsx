import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { APIPartParameter } from "../../models/APIPartParameter.model";
import { APIPartStock } from "../../models/APIPartStock.model";
import { Badge } from "../Badge";
import { APIStockLocation } from "../../models/APIStockLocation";
import { APISupplierPart } from "../../models/APISupplierPart.model";
import { APIBuildOrder } from "../../models/APIBuildOrder.model";
import { Progressbar } from "./ProgressBar";

const SideDetailTableHeader = ({ topic }: { topic: string }) => {
	switch (topic) {
		case "Parameters":
			return (
				<>
					<tr className="text-left">
						<th className="w-2/12">Name</th>
						<th className="w-5/12">Description</th>
						<th className="w-1/12">Data</th>
						<th className="w-1/12">Units</th>
						<th></th>
					</tr>
				</>
			);
		case "Stock":
			return (
				<>
					<tr className="text-left align-center">
						<th className="text-center w-fit">Status</th>
						<th className="w-fit">Location</th>
						<th className="text-center w-3/12">Allocated / Quantity</th>
						<th className="w-2/12">Supplier part</th>
						<th className="w-2/12">Expiry Date</th>
					</tr>
				</>
			);
		case "Build Orders":
			return (
				<>
					<tr className="text-left">
						<th className="w-3/12">Name</th>
						<th className="w-1/12 text-center">State</th>
						<th className="w-3/12">Progress</th>
						<th className="w-1/12 text-center">Qty needed</th>
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

const getStockStatusBadgeVariant = (
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

const getProductionStatusBadgeVariant = (
	status: 10 | 20 | 30 | 40,
): "primary" | "success" | "info" | "error" => {
	switch (status) {
		case 10:
			return "info";
		case 20:
			return "primary";
		case 30:
			return "error";
		case 40:
			return "success";

		default:
			throw new Error("Unknown status code");
	}
};

const ParametersTable = ({ data }: { data: APIPartParameter[] }) => {
	return (
		<>
			{data.map((param, key) => (
				<tr
					key={key}
					className="text-left align-center"
				>
					<td className="text-left align-center">
						{param.template_detail.name}
					</td>
					<td className="text-left align-center">
						{param.template_detail.description}
					</td>
					<td className="text-left align-center">{param.data}</td>
					<td className="text-left align-center">
						{param.template_detail.units}
					</td>
				</tr>
			))}
		</>
	);
};

const StockLocationCell = ({ id }: { id: number }) => {
	const { isPending, isFetching, data } = useQuery({
		queryKey: [id],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/location/${id}`)
				.then((res) => res.data),
	});
	const location: APIStockLocation = data;
	const isLoading = isFetching || isPending;
	return <>{!isLoading && <div>{location.pathstring}</div>}</>;
};

const SupplierPartCell = ({ id }: { id: number }) => {
	const { isPending, isFetching, data } = useQuery({
		queryKey: [id],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/supplier/${id}`)
				.then((res) => res.data),
	});
	const SP: APISupplierPart = data;
	const isLoading = isFetching || isPending;
	return (
		<>
			{!isLoading && (
				<>
					{SP.link !== null && (
						<Link
							target="_blank"
							rel="noopener noreferrer"
							className="link link-accent"
							to={SP.link}
						>
							<div>{SP.SKU}</div>
						</Link>
					)}
					{SP.link === null && (
						<div>{SP.SKU || "No supplier part link found"}</div>
					)}
				</>
			)}
		</>
	);
};

const StockTable = ({ data }: { data: APIPartStock[] }) => {
	return (
		<>
			{data!.map((stock, key) => (
				<tr key={key}>
					<td className="text-center">
						{(stock.expired || stock.stale) && (
							<div
								className="tooltip"
								data-tip={
									<>
										{stock.stale && "Stock has gone stale! "} ||{" "}
										{stock.expired && "Stock has expired!"}
									</>
								}
							>
								<Badge variant={getStockStatusBadgeVariant(stock.status)}>
									{stock.status_text}
								</Badge>
							</div>
						)}
						{!(stock.expired || stock.stale) && (
							<Badge variant={getStockStatusBadgeVariant(stock.status)}>
								{stock.status_text}
							</Badge>
						)}
					</td>
					<td>
						<StockLocationCell id={stock.location} />
					</td>
					<td>
						<Progressbar
							max={stock.quantity}
							value={stock.allocated}
						/>
					</td>
					<td>
						<SupplierPartCell id={stock.supplier_part} />
					</td>
					<td>{stock.expiry_date || "No expiry date"}</td>
				</tr>
			))}
		</>
	);
};

const BuildOrdersTable = ({ data }: { data: APIBuildOrder[] }) => {
	return (
		<>
			{data!.map((bo: APIBuildOrder, key) => (
				<tr key={key}>
					<td>
						<Link
							to={`/Part/${bo.build_detail.part}`}
							className="link link-accent"
						>
							{bo.build_detail.reference} {bo.build_detail.title}
						</Link>
					</td>
					<td className="text-center">
						<Badge
							variant={getProductionStatusBadgeVariant(bo.build_detail.status)}
						>
							{bo.build_detail.status_text}
						</Badge>
					</td>
					<td>
						<Progressbar
							max={bo.build_detail.quantity}
							value={bo.build_detail.completed}
						/>
					</td>
					<td className="text-center">{bo.quantity}</td>
				</tr>
			))}
		</>
	);
};

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
			<div className="overflow-x-auto w-full">
				<table className="table-fixed border-separate border-spacing-2">
					<thead>
						<SideDetailTableHeader topic={topic} />
					</thead>
					<tbody className="">
						{isLoading ? (
							<tr>
								<td>Loading...</td>
							</tr>
						) : (
							<>
								{topic === "Parameters" && <ParametersTable data={data} />}
								{topic === "Stock" && <StockTable data={data} />}
								{topic === "Build Orders" && <BuildOrdersTable data={data} />}
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
