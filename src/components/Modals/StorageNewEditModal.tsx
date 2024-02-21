import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import axios, { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { Checkbox } from "../Form/Checkbox";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { StorageNewEditForm } from "../Form/StorageNewEditForm";

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

type DataProps = {
	pk: string;
	active: boolean;
	assembly: boolean;
	component: boolean;
	is_template: boolean;
	purchaseable: boolean;
	salable: boolean;
	trackable: boolean;
	virtual: boolean;
	name: string;
	category: number;
	minimum_stock: number;
	description: string;
};

export const StorageNewEditModal = ({
	storage,
	refetch,
}: {
	storage?: UseQueryResult<DataProps, any>;
	refetch: () => void;
}) => {
	const [moreStorages, setMoreStorages] = useState(false);

	const method = useForm();
	const nav = useNavigate();

	const onSubmit = method.handleSubmit((data) => {
		let methodREST: "post" | "update" = "post";
		if (storage !== undefined) methodREST = "update";
		sendData(
			data,
			method,
			methodREST,
			refetch,
			moreStorages,
			nav,
			storage?.data?.pk,
		);
	});

	const onCancel = () => {
		method.reset();
	};

	return (
		<Modal
			id="storageNewEditModal"
			title={(storage !== undefined ? "Edit" : "New") + " storage"}
		>
			<form method="dialog">
				<Button
					size="sm"
					variant="ghost"
					className="btn-circle absolute right-3 top-3"
					onClick={onCancel}
				>
					✕
				</Button>
			</form>
			{storage === undefined && (
				<>
					<StorageNewEditForm methods={method} />
				</>
			)}
			{storage !== undefined && (
				<>
					<StorageNewEditForm methods={method} />
				</>
			)}
			<div className="modal-action">
				<div className="flex flex-row gap-2 w-full items-end">
					<div className="flex flex-col">
						{storage === undefined && (
							<Checkbox
								handleChange={(event) => setMoreStorages(event.target.checked)}
								id="moreStorages"
								label="Add more storages?"
								checked={moreStorages}
							/>
						)}
					</div>
					<div className="flex-grow"></div>
					<Button
						variant="success"
						onClick={onSubmit}
					>
						Submit
					</Button>
					<form method="dialog">
						<Button onClick={onCancel}>Cancel</Button>
					</form>
				</div>
			</div>
		</Modal>
	);
};
