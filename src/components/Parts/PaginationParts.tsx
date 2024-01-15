import { useEffect, useState } from "react";
import { PartsItems } from "../../models/PartsItems.model";
import { PaginationCountSelector } from "../../modules/Parts/Parts";
import { Link } from "react-router-dom";
import { Thumbnail } from "../Thumbnail";
import { createURL } from "../InvenTree/apiCalls";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../Button";
import { NewPartModal } from "../Modals/NewPartModal";

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
						<div className="flex flex-none w-full justify-normal">
							<div className="basis-1/8">
								<Thumbnail src={item.image} />
							</div>
							<div className="flex-col basis-7/12 ml-4">
								<p className="text-md font-medium text-gray-900 truncate dark:text-white">
									{item.full_name}
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{item.description}
								</p>
							</div>
							<div className="flex-1"></div>
							<div className="align-end text-end dark:text-white">
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
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(
		parseInt(localStorage.getItem("paginationQty") || "25"),
	);

	const { isPending, error, data, isFetching } = useQuery({
		queryKey: [categoryID, itemsPerPage, currentPage],
		queryFn: () =>
			axios
				.get(
					createURL(`${process.env.REACT_APP_BE_HOST}parts/paginated/`, {
						page: currentPage,
						pageSize: itemsPerPage,
						category: parseInt(categoryID),
					}),
				)
				.then((res) => res.data),
	});

	useEffect(() => {
		setCurrentPage(0);
	}, [itemsPerPage, categoryID]);

	const handlePageClick = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected);
	};
	const isLoading = isPending || isFetching;
	const parts: PartsItems = data?.data;
	const totalPages: number = data?.totalPages;

	if (error) return <p>An error has occurred: {error.message}</p>;
	return (
		<>
			<div className="mt-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
				<div className="flex items-center justify-between mb-4">
					<h5 className="text-xl font-bold pl-2 leading-none text-gray-900 dark:text-white">
						{categoryName}
					</h5>
					<div className="flex flex-row gap-5 items-center">
						<Button
							variant="success"
							size="sm"
							negative
							className="overflow-hidden align-middle"
							onClick={() => {
								(
									document.getElementById("newPartModal")! as HTMLDialogElement
								).showModal();
							}}
						>
							New part
						</Button>
						<PaginationCountSelector
							partCount={itemsPerPage}
							setPartCount={setItemsPerPage}
						/>
					</div>
				</div>
				<div className="flow-root">
					<ul className="divide-y sm:mx-2 sm:px-1 divide-gray-200 dark:divide-gray-700">
						{!isLoading ? (
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

			<div className="flex justify-center my-4">
				{!isLoading && (
					<ReactPaginate
						breakLabel="..."
						nextLabel="next >"
						onPageChange={handlePageClick}
						pageRangeDisplayed={window.innerWidth >= 760 ? 5 : 2}
						pageCount={totalPages}
						previousLabel="< prev"
						renderOnZeroPageCount={null}
						containerClassName="join"
						pageLinkClassName="join-item btn bg-gray-800"
						activeLinkClassName="join-item btn bg-inherit"
						breakLinkClassName="join-item btn btn-disabled"
						marginPagesDisplayed={2}
						nextLinkClassName="join-item btn bg-gray-800"
						previousLinkClassName="join-item btn bg-gray-800"
						forcePage={currentPage > totalPages ? -1 : currentPage}
					/>
				)}
			</div>
			<NewPartModal />
		</>
	);
};
