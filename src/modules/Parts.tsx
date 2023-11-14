import { useParams } from "react-router-dom";
import { TreeView } from "../components/Treeview";
import { FetchParts, PartsItems } from "../components/InvenTree/apiCalls";
type PartItemsProps = {
	items: PartsItems;
	categoryName?: string;
};

const PartListItems = ({ items }: PartItemsProps) => {
	if (items.length === 0)
		return (
			<li>
				<div className="flex items-center">
					<div className="flex-1 min-w-0 ms-4">No parts found.</div>
				</div>
			</li>
		);
	return (
		<>
			{items.map((item) => (
				<li className="py-3 sm:py-4">
					<div className="flex items-center">
						<div className="flex-1 min-w-0 ms-4">
							<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
								{item.full_name}
							</p>
							<p className="text-sm text-gray-500 truncate dark:text-gray-400">
								{item.description}
							</p>
						</div>
						<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
							{item.in_stock}
						</div>
					</div>
				</li>
			))}
		</>
	);
};

const PartList = ({ items, categoryName }: PartItemsProps) => {
	if (!items) return <div>Loading parts...</div>;
	return (
		<div className="w-full max-w-md mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
			<div className="flex items-center justify-between mb-4">
				<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
					{categoryName}
				</h5>
			</div>
			<div className="flow-root">
				<ul className="divide-y divide-gray-200 dark:divide-gray-700">
					<PartListItems items={items} />
				</ul>
			</div>
		</div>
	);
};

export const Parts = () => {
	const params = useParams();
	let category: number | undefined = params?.categoryID
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
				<div className="basis-2/3">
					<PartList
						items={parts}
						categoryName={params.categoryName || "All"}
					/>
				</div>
			</div>
		</>
	);
};
