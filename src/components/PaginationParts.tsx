import { useEffect, useState } from "react";
import { PartsItems } from "../models/PartsItems.model";
import { PaginationCountSelector } from "../modules/Parts";
import { Link } from "react-router-dom";
import { Thumbnail } from "./Thumbnail";
import { APIParts, FetchParts } from "./InvenTree/apiCalls";
import ReactPaginate from "react-paginate";

type PartItemsProps = {
	items: PartsItems;
	categoryName?: string;
};
const PartListItems = ({ items }: PartItemsProps) => {
	if (items.length === 0)
		return (
			<li>
				<div className="flex items-center">
					<div className="flex-1 min-w-0 ms-4">No parts found...</div>
				</div>
			</li>
		);
	return (
		<>
			{items.map((item) => (
				<li
					className="py-3 sm:py-4"
					key={item.pk}
				>
					<Link to={`/part/${item.pk}`}>
						<div className="flex flex-grow-0 flex-shrink-0 justify-between flex-wrap">
							<div className="basis-1/8">
								<Thumbnail id={item.pk} />
							</div>
							<div className="flex-col basis-8/12">
								<p className="text-md font-medium text-gray-900 truncate dark:text-white">
									{item.full_name}
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{item.description}
								</p>
							</div>
							<div className="justify-end text-end dark:text-white">
								<p>Qty reserved: {item.in_stock}</p>
								<p>Qty in stock: {item.in_stock}</p>
							</div>
						</div>
					</Link>
				</li>
			))}
		</>
	);
};
type PaginatedItemsProps = {
	categoryName: string;
	categoryID: string;
};

export const PaginatedItems = ({
	categoryName,
	categoryID,
}: PaginatedItemsProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [parts, setParts] = useState<PartsItems>();
	const [loading, setLoading] = useState(true);
	const [itemsPerPage, setItemsPerPage] = useState(
		parseInt(localStorage.getItem("paginationQty") || "25"),
	);

	useEffect(() => {
		setLoading(true);
		setCurrentPage(1);
	}, [itemsPerPage]);

	useEffect(() => {
		async function getter() {
			const response: APIParts = await FetchParts({
				page: currentPage,
				pageSize: itemsPerPage,
				category: parseInt(categoryID),
			});
			setParts(response.data);
			setTotalPages(response.totalPages);
			setLoading(false);
		}

		loading && getter();
	}, [categoryID, currentPage, itemsPerPage, loading]);

	useEffect(() => {
		setLoading(true);
	}, [categoryName]);

	const handlePageClick = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected);
		setLoading(true);
	};
	console.log(currentPage);

	return (
		<>
			<div className="mt-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
				<div className="flex items-center justify-between mb-4">
					<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
						{categoryName}
					</h5>
					<PaginationCountSelector
						partCount={itemsPerPage}
						setPartCount={setItemsPerPage}
					/>
				</div>
				<div className="flow-root">
					<ul className="divide-y divide-gray-200 dark:divide-gray-700">
						{!loading ? (
							<PartListItems items={parts!} />
						) : (
							<li>
								<div className="flex items-center justify-content-center">
									<div className="flex-1 min-w-0 ms-4">
										<span className="loading loading-spinner loading-lg"></span>
									</div>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>

			{/* Pagination controls */}
			<div className="flex justify-center my-4">
				{!loading && (
					<ReactPaginate
						breakLabel="..."
						nextLabel="next >"
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={totalPages}
						previousLabel="< prev"
						renderOnZeroPageCount={null}
						containerClassName="join"
						pageLinkClassName="join-item btn"
						activeLinkClassName="join-item btn btn-active"
						breakLinkClassName="join-item btn btn-disabled"
						marginPagesDisplayed={2}
						nextLinkClassName="join-item btn"
						previousLinkClassName="join-item btn"
						forcePage={currentPage > totalPages ? -1 : currentPage}
					/>
				)}
			</div>
		</>
	);
};
