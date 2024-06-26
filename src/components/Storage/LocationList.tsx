import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { Button } from "../Button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../Modals/Modal";
import { StorageNewEditForm } from "../Form/StorageNewEditForm";
import { useState } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";

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

const deleteObject = (pk: number) => {
	axios.delete(`${process.env.REACT_APP_BE_HOST}location`, {
		data: {
			pk: pk,
		},
		headers: {
			Authorization: process.env.REACT_APP_BE_DELETE_TOKEN,
		},
	});
};

const onContinue = (method: UseFormReturn) => {
	method.resetField("ip");
};

const sendData = (
	data: FieldValues,
	formReturn: UseFormReturn,
	method: "post" | "update",
	refetch: () => void,
	moreStorages: boolean,
	nav: NavigateFunction,
	pk?: string,
) => {
	if (method === "post") {
		axios
			.post(`${process.env.REACT_APP_BE_HOST}location/`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res: AxiosResponse) => {
				if (!moreStorages) {
					(
						document.getElementById("storageNewEditModal")! as HTMLDialogElement
					).close();
					refetch();
				} else {
					onContinue(formReturn);
				}
			})
			.catch((r) => {
				console.log(r.message);
			});
	} else {
		console.log(data);
		axios
			.put(`${process.env.REACT_APP_BE_HOST}location/${pk}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				(
					document.getElementById("storageNewEditModal")! as HTMLDialogElement
				).close();
				refetch();
			})
			.catch((r) => {
				console.log(r.message);
			});
	}
};

export const LocationList = () => {
	const locations = useQuery({
		queryKey: ["locationTable"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs/`)
				.then((res) => res.data),
	});

	const [moreStorages, setMoreStorages] = useState(false);

	const method = useForm();
	const nav = useNavigate();

	const onSubmit = method.handleSubmit((data) => {
		let methodREST: "post" | "update" = "post";
		sendData(data, method, methodREST, locations.refetch, moreStorages, nav);
	});

	const onCancel = () => {
		method.reset();
	};

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
						<Modal
							id="deleteConfirmationModal"
							title={`Are you sure you wish to delete ${location.name}`}
							submitTitle="Delete"
							submitVariant="error"
							onSubmit={() => deleteObject(location.pk)}
						/>
					</li>
				))}
			</ul>
			<Modal
				id="storageNewEditModal"
				title="New location"
				submitTitle="Submit"
				onSubmit={onSubmit}
				onCancel={onCancel}
				checkboxLabel="Create more locations?"
				checkboxSetter={setMoreStorages}
				checkboxState={moreStorages}
			>
				<StorageNewEditForm methods={method} />
			</Modal>
		</>
	);
};
