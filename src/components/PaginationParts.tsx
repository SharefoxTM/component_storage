import { useEffect, useState } from "react";
import { PartsItems } from "../models/PartsItems.model";
import ReactPaginate from "react-paginate";
import { PaginationCountSelector } from "../modules/Parts";

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
type PaginatedItemsProps = {
	items: PartsItems | undefined;
	categoryName: string;
};

export const PaginatedItems = ({
	items,
	categoryName,
}: PaginatedItemsProps) => {
	const [loading, setLoading] = useState(true);
	const [itemOffset, setItemOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(
		parseInt(localStorage.getItem("paginationQty") || "25"),
	);
	let endOffset: number = 0;
	let currentItems: PartsItems | undefined = undefined;
	let pageCount: number = 0;

	useEffect(() => {
		function categoryUpdate() {
			setLoading(true);
		}
		categoryUpdate();
	}, [categoryName]);

	useEffect(() => {
		function itemUpdate() {
			setItemOffset(0);
			setCurrentPage(0);
			setLoading(false);
		}
		if (items) itemUpdate();
	}, [items]);

	if (items) {
		endOffset = itemOffset + itemsPerPage;
		currentItems = items.slice(itemOffset, endOffset);
		pageCount = Math.ceil(items.length / itemsPerPage);
	}
	const handlePageClick = (selectedItem: { selected: number }) => {
		const newOffset = (selectedItem.selected * itemsPerPage) % items!.length;
		setItemOffset(newOffset);
		setCurrentPage(selectedItem.selected);
	};

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [currentItems]);
	useEffect(() => {});

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
							<PartListItems items={currentItems!} />
						) : (
							<li>
								<div className="flex items-center">
									<div className="flex-1 min-w-0 ms-4">Loading parts...</div>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
			<div className="flex justify-center my-4">
				{!loading && (
					<ReactPaginate
						breakLabel="..."
						nextLabel="next >"
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel="< prev"
						renderOnZeroPageCount={null}
						containerClassName="join"
						pageLinkClassName="join-item btn"
						activeLinkClassName="join-item btn btn-active"
						breakLinkClassName="join-item btn btn-disabled"
						marginPagesDisplayed={2}
						nextLinkClassName="join-item btn"
						previousLinkClassName="join-item btn"
						forcePage={currentPage > pageCount ? -1 : currentPage}
					/>
				)}
			</div>
		</>
	);
};
