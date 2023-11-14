import { useParams } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { TreeView } from "../components/Treeview";
import { FetchParts } from "../components/InvenTree/apiCalls";
import { PartsItems } from "../models/PartsItems.model";
import { PaginatedItems } from "../components/PaginationParts";

type PaginationCountSelectorProps = {
	partCount: number;
	setPartCount: Dispatch<SetStateAction<number>>;
};

export const PaginationCountSelector = ({
	partCount,
	setPartCount,
}: PaginationCountSelectorProps) => {
	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		setPartCount(parseInt(event.currentTarget.value));
		localStorage.setItem("paginationQty", event.currentTarget.value);
	}
	return (
		<div>
			<select
				defaultValue={partCount}
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
		</div>
	);
};

type PartItemsProps = {
	items: PartsItems;
	categoryName?: string;
};

const PartList = ({ items, categoryName }: PartItemsProps) => {
	return (
		<PaginatedItems
			items={items}
			categoryName={categoryName}
		/>
	);
};

export const Parts = () => {
	const params = useParams();
	const category: number | undefined = params?.categoryID
		? parseInt(params.categoryID)
		: undefined;

	const parts: PartsItems = FetchParts(process.env.REACT_APP_DB_TOKEN, {
		category,
	});

	return (
		<>
			<div className="flex flex-row">
				<div>
					<TreeView />
				</div>
				<div className="flex flex-grow justify-center">
					<div className="basis-5/6">
						<PartList
							items={parts}
							categoryName={params.categoryName || "All"}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
