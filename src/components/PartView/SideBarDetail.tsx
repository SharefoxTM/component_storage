import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { APIPartParameter } from "../../models/APIPartParameter.model";
import { APIPartStock } from "../../models/APIPartStock.model";
import { Badge } from "../Badge";
import { APIBuildOrder } from "../../models/APIBuildOrder.model";
import { Progressbar } from "./ProgressBar";
import { APIUsedIn } from "../../models/APIUsedIn.model";
import { Thumbnail } from "../Thumbnail";
import { Button } from "../Button";
import { ParameterModal } from "../Modals/ParameterModal";

const SideDetailTableHeader = ({ topic }: { topic: string }) => {
	switch (topic) {
		case "Parameters":
			return (
				<>
					<tr className="text-left">
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
					<tr className="text-left">
						<th className="text-center w-1/5">Status</th>
						<th className="w-3/12">Location</th>
						<th className="text-center w-4/12">Allocated / Quantity</th>
						<th className="w-2/12">Supplier part</th>
						<th>Expiry Date</th>
					</tr>
				</>
			);
		case "Build Orders":
			return (
				<>
					<tr className="text-left">
						<th>Name</th>
						<th className="text-center">State</th>
						<th>Progress</th>
						<th className="text-center">Qty needed</th>
					</tr>
				</>
			);
		case "Used In":
			return (
				<>
					<tr className="text-left">
						<th className="w-8/12">Assembly</th>
						<th className="w-4/12">Required quantity</th>
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
					className="text-left"
				>
					<td>{param.template_detail.name}</td>
					<td>{param.template_detail.description}</td>
					<td>{param.data}</td>
					<td>{param.template_detail.units}</td>
				</tr>
			))}
		</>
	);
};

const SupplierPartCell = ({
	name,
	url,
}: {
	name: string;
	url: string | null;
}) => {
	return (
		<>
			{url !== null && (
				<Link
					target="_blank"
					rel="noopener noreferrer"
					className="link link-accent"
					to={url}
				>
					<div>{name}</div>
				</Link>
			)}
			{url === null && <div>{name || "No supplier part link found"}</div>}
		</>
	);
};

const StockTable = ({ data }: { data: APIPartStock[] }) => {
	return (
		<>
			{data!.map((stock, key) => (
				<tr
					key={key}
					className="text-xs"
				>
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
					<td>{stock.LocationName || "No location."}</td>
					<td>
						<Progressbar
							max={stock.quantity}
							value={stock.allocated}
						/>
					</td>
					<td>
						{stock.supplier_part_detail !== null ? (
							<SupplierPartCell
								name={stock.supplier_part_detail.name}
								url={stock.supplier_part_detail.url}
							/>
						) : (
							"No supplier part."
						)}
					</td>
					<td>{stock.expiry_date || "No expiry date."}</td>
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

const UsedInsTable = ({ data }: { data: APIUsedIn[] }) => {
	return (
		<>
			{data!.map((ui: APIUsedIn, key) => (
				<tr key={key}>
					<td>
						<Link
							to={`/Part/${ui.part_detail.pk}`}
							className="link link-accent"
						>
							<div className="flex flex-row items-center justify-start gap-5 text-center">
								<Thumbnail src={ui.part_detail.thumbnail} />
								<div>{ui.part_detail.full_name}</div>
							</div>
						</Link>
					</td>
					<td className="text-center">{ui.quantity}</td>
				</tr>
			))}
		</>
	);
};

const GetSideDetailContent = ({ topic }: { topic: string }) => {
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");
	const { isPending, isFetching, data, error } = useQuery({
		queryKey: [topic, param.partID],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/${param.partID}/${topic}`)
				.then((res) => res.data),
	});

	const isLoading = isFetching || isPending;
	if (error) {
		throw new Error(error.message);
	}
	return (
		<>
			<table className="table border-white gap-2">
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
							{data.length !== 0 ? (
								<>
									{topic === "Parameters" && <ParametersTable data={data} />}
									{topic === "Stock" && <StockTable data={data} />}
									{topic === "Build Orders" && <BuildOrdersTable data={data} />}
									{topic === "Used In" && <UsedInsTable data={data} />}
								</>
							) : (
								<tr>
									<td colSpan={3}>
										No {topic.toLowerCase()} found for this item.
									</td>
								</tr>
							)}
						</>
					)}
				</tbody>
			</table>
		</>
	);
};

export const PartViewSideDetail = ({ topic }: { topic: string }) => {
	const part = parseInt(useParams().partID!);
	return (
		<>
			<Card.CardContainer>
				<Card.CardTitle>
					<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle items-end flex flex-shrink-0 flex-row justify-between w-full">
						<div>{topic}</div>
						{topic === "Parameters" && (
							<>
								<Button
									size="sm"
									variant="success"
									onClick={() => {
										(
											document.getElementById(
												"parameterModal",
											)! as HTMLDialogElement
										).showModal();
									}}
									className="me-2"
								>
									New Parameter
								</Button>
								<ParameterModal part={part} />
							</>
						)}
					</div>
				</Card.CardTitle>
				<Card.CardBody>
					<GetSideDetailContent topic={topic} />
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
