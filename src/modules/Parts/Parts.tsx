import { useParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { TreeView } from "../../components/Parts/Treeview";
import { PaginatedItems } from "../../components/Parts/PaginationParts";
import { backendAxios } from "../../utilities/utils";
import { useQuery } from "@tanstack/react-query";

type PaginationCountSelectorProps = {
	partCount: number;
	setPartCount: Dispatch<SetStateAction<number>>;
};

export const PaginationCountSelector = ({
	partCount,
	setPartCount,
}: PaginationCountSelectorProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPartCount(parseInt(event.currentTarget.value));
		localStorage.setItem("paginationQty", event.currentTarget.value);
	};
	return (
		<div>
			<select
				defaultValue={partCount}
				onChange={handleChange}
				id="paginationQty"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
		</div>
	);
};

export const Parts = () => {
	const params = useParams();
	const { data, isLoading } = useQuery({
		queryKey: [`part list ${params.categoryName}`],
		queryFn: () => {
			if (params.categoryName !== "All" && params.categoryName)
				return backendAxios
					.get(`categories/${params.categoryName}`)
					.then((res) => res.data.pk)
					.catch(() => null);
			else return null;
		},
	});

	return (
		<>
			<div className="flex flex-col md:flex-shrink-0 md:flex-row md:gap-5">
				<div className="md:basis-1/5">
					<TreeView />
				</div>
				<div className="md:basis-3/5">
					<div>
						<PaginatedItems
							categoryName={params.categoryName || "All"}
							isFetchingID={isLoading}
							categoryID={data}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
