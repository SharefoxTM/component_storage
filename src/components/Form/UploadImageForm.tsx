import { FormProvider, UseFormReturn } from "react-hook-form";
import { FileUpload } from "../Input/FileUpload";
import { DropEvent } from "react-dropzone";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Thumbnail } from "../Thumbnail";

type PartImportFormProps = {
	id: string;
	image: string;
	methods: UseFormReturn;
	onDrop: (files: File[], event: DropEvent) => void;
	onClick: (id: string) => void;
};

type galleryItem = {
	image: string;
	count: number;
};

type galleryItemProps = {
	items: galleryItem[];
	onClick: (id: string) => void;
};

const PaginatedGallery = (galleryItems: galleryItemProps) => {
	if (galleryItems.items.length === 0)
		return (
			<li>
				<div className="flex items-center">
					<div className="flex-1 min-w-0 ms-4">No parts found...</div>
				</div>
			</li>
		);
	return (
		<>
			<div className="flex items-center flex-wrap w-full">
				{galleryItems.items.map(({ image, count }, index) => (
					<div
						className="flex-grow width-1/3"
						key={index}
						onClick={() => galleryItems.onClick(image)}
					>
						<div
							className="tooltip"
							data-tip={image.split("/").pop()}
						>
							<Thumbnail src={`/${image}`} />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const UploadImageForm = ({
	id,
	image,
	methods,
	onDrop,
	onClick,
}: PartImportFormProps) => {
	const [currentPage, setCurrentPage] = useState(0);

	const thumbs = useQuery({
		queryKey: [currentPage],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}file/thumbs/`, {
					params: {
						page: currentPage,
						pageSize: 12,
					},
				})
				.then((res: AxiosResponse) => res.data),
	});

	useEffect(() => {
		setCurrentPage(0);
	}, []);

	const acceptedExtensions = { "image/png": [], "image/jpeg": [] };

	const handlePageClick = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected);
	};

	const totalPages: number = thumbs.data?.totalPages;

	return (
		<>
			<FormProvider {...methods}>
				<form
					id="uploadImageForm"
					onSubmit={(e) => e.preventDefault()}
					noValidate
				>
					<input
						type="hidden"
						id="pk"
						value={id}
					/>
					<input
						type="hidden"
						id="image-input"
						name="image"
						value={image}
					/>
					<div className="form-control w-full mt-8">
						<FileUpload
							id="imageUpload"
							accept={acceptedExtensions}
							onDrop={onDrop}
						/>
					</div>
					<div className="form-control w-full">
						<h1 className="text-lg">Or select an existing image</h1>
					</div>
					<div className="form-control w-full">
						{(thumbs.isLoading && (
							<li>
								<div className="flex items-center justify-content-center">
									<div className="flex-1 min-w-0 ms-4">
										<span className="loading loading-spinner loading-lg"></span>
									</div>
								</div>
							</li>
						)) || (
							<PaginatedGallery
								items={thumbs.data.data}
								onClick={onClick}
							/>
						)}
					</div>
					<div className="form-control w-full flex items-center mt-5">
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
					</div>
				</form>
			</FormProvider>
		</>
	);
};
