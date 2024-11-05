import { useParams } from "react-router-dom";
import { Thumbnail } from "../Thumbnail";
import { DropDownSettings } from "./DropdownSettings";
import { StatView } from "../StatView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIGetPart } from "../../models/APIGetPart.model";
import { Progressbar } from "./ProgressBar";
import { PartBadges } from "./PartBadges";
import Card from "../Card/Card";
import { PartNewEditModal } from "../Modals/PartNewEditModal";
import { Modal } from "../Modals/Modal";
import { UploadImageForm } from "../Form/UploadImageForm";
import { useForm } from "react-hook-form";
import { DropEvent } from "react-dropzone";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const postData = (id: any, data: FormData) => {
	axios
		.put(`${process.env.REACT_APP_BE_HOST}parts/${id}/image/`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => {
			console.log(res);
			if (res.status === 201) {
				(
					document.getElementById("uploadImageModal")! as HTMLDialogElement
				).close();
				window.location.reload();
			}
		})
		.catch((r) => {
			console.log(r.message);
		});
};

const createFormData = (files: File[], event?: DropEvent) => {
	const body = new FormData();
	const id = (document.getElementById("pk") as HTMLInputElement).value;
	body.append("image", files[0]);
	postData(id, body);
};

const changeData = async (image: string) => {
	const imageInput = document.getElementById("image-input") as HTMLInputElement;
	imageInput.value = image;
	console.log(imageInput);
	const body = new FormData();
	const id = (document.getElementById("pk") as HTMLInputElement).value;
	body.append("image", imageInput.value);
	postData(id, body);
};

export const MainContent = () => {
	const method = useForm();
	const param = useParams();
	if (!param.partID) throw new Error("No part id specified!");

	const part = useQuery({
		queryKey: [`partView ${param.partID}`],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}parts/${param.partID}`)
				.then((res) => res.data),
	});
	if (part.error) return <p>An error has occurred: {part.error.message}</p>;
	const isLoading = part.isFetching || part.isPending;
	const partData: APIGetPart = part.data;

	return (
		<>
			<Card.CardContainer>
				<Card.CardTitle>
					{!isLoading ? (
						<div className="text-white text-2xl md:text-4xl font-bold mb-2 align-middle">
							{partData.name}
						</div>
					) : (
						<div className="skeleton my-2 h-10 w-52 align-middle" />
					)}
					<DropDownSettings />
					<PartNewEditModal part={part} />
				</Card.CardTitle>
				<Card.CardBody>
					<div className="basis-5/12">
						{!isLoading ? (
							<>
								<div
									onClick={() => {
										(
											document.getElementById(
												"uploadImageModal",
											)! as HTMLDialogElement
										).showModal();
									}}
								>
									<Thumbnail
										src={partData.image}
										size="w-28"
										isHoverable={true}
										HoverElement={
											<p className="absolute top-0 left-1 text-black">
												<FontAwesomeIcon icon={faUpload} />
											</p>
										}
									/>
								</div>
								<Modal
									id="uploadImageModal"
									title="Upload Image"
								>
									<UploadImageForm
										id={param.partID}
										image={partData.image}
										methods={method}
										onDrop={createFormData}
										onClick={changeData}
									/>
								</Modal>
							</>
						) : (
							<>
								<div className="skeleton relative flex">
									<div className="w-28 rounded aspect-square">
										<div className="w-full h-full"></div>
									</div>
								</div>
							</>
						)}

						{!isLoading ? (
							<>
								<PartBadges part={partData} />
								<p className="text-white">Description:</p>
								<p>{partData.description}</p>
							</>
						) : (
							<>
								<div className="skeleton my-2 h-6 w-52 align-middle" />
								<p className="text-white">Description:</p>
								<div className="skeleton my-2 h-10 w-52 align-middle" />
							</>
						)}
					</div>
					<div className="basis-1/12" />

					<div className="stats stats-vertical shadow basis-5/12 overflow-clip">
						<StatView title="Available stock">
							{!isLoading ? (
								partData.unallocated_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Total stock">
							{!isLoading ? (
								partData.total_in_stock
							) : (
								<p className="skeleton h-10 w-full"></p>
							)}
						</StatView>
						<StatView title="Allocated stock">
							{!isLoading ? (
								<Progressbar
									value={partData.allocated_to_build_orders}
									max={partData.required_for_build_orders}
								/>
							) : (
								<div className="skeleton h-10 w-full rounded-full position-relative"></div>
							)}
						</StatView>
					</div>
				</Card.CardBody>
			</Card.CardContainer>
		</>
	);
};
