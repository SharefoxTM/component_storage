import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { Button } from "../Button";
import { StorageNewEditModal } from "../Modals/StorageNewEditModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteConfirmationModal } from "../Modals/DeleteConfirmationModal";

const lightModeButtons = [
	{
		label: "Normal",
		mode: "NORMAL",
	},
	{
		label: "Vegas",
		mode: "VEGAS",
	},
	{
		label: "Knight Rider",
		mode: "KR",
	},
];

const buttonSize:
	| "sm"
	| "md"
	| "lg"
	| "xs"
	| "wide"
	| "block"
	| "responsive"
	| undefined = "md";

export const LocationList = () => {
	const locations = useQuery({
		queryKey: ["locationTable"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs/`)
				.then((res) => res.data),
	});
	return (
		<>
			<ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
				{locations.data?.map((location: APILocationDetail, key: number) => (
					<li
						id={location.pk.toString()}
						className="w-full ps-2 py-3"
						key={key}
					>
						<div className="flex w-full flex-row gap-2 items-center">
							<p className="me-auto text-2xl">{location.name}</p>
							<Button
								size={buttonSize}
								variant="info"
								onClick={(e) =>
									axios
										.post(`${process.env.REACT_APP_BE_HOST}storage/init/`, {
											pk: location.pk,
										})
										.then((data) => data)
										.catch((error) => console.log(error))
								}
							>
								init
							</Button>
							{lightModeButtons.map((button) => (
								<Button
									size={buttonSize}
									variant="info"
									onClick={(e) =>
										axios
											.post(
												`${process.env.REACT_APP_BE_HOST}storage/mode/`,
												JSON.stringify({
													mode: button.mode,
													ip: location.name,
												}),
												{
													headers: {
														"Content-Type": "application/json",
													},
												},
											)
											.catch((r) => {
												console.log(r.message);
											})
									}
								>
									{button.label}
								</Button>
							))}
							<Button
								size={buttonSize}
								variant="error"
								onClick={() => {
									(
										document.getElementById(
											"deleteConfirmationModal",
										)! as HTMLDialogElement
									).showModal();
								}}
								className="text-white"
							>
								<FontAwesomeIcon icon={faTrash} />
							</Button>
						</div>
						<DeleteConfirmationModal
							pk={location.pk}
							name={location.name}
							endpoint="location"
						/>
					</li>
				))}
			</ul>
			<StorageNewEditModal refetch={locations.refetch} />
		</>
	);
};
