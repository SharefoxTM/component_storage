import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Button } from "../Button";
import axios, { AxiosResponse } from "axios";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Checkbox } from "../Form/Checkbox";
import { ParameterForm } from "../Form/ParameterForm";

const onContinue = (method: UseFormReturn) => {
	method.resetField("value");
};

const sendData = (
	data: FieldValues,
	formReturn: UseFormReturn,
	queryClient: QueryClient,
	moreParameters: boolean,
	part: number,
) => {
	data = {
		part: part,
		template: data.template.value,
		data: data.data,
	};
	axios
		.post(`${process.env.REACT_APP_BE_HOST}parts/parameter/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res: AxiosResponse) => {
			if (!moreParameters) {
				(
					document.getElementById("parameterModal")! as HTMLDialogElement
				).close();
				queryClient.refetchQueries();
			} else {
				onContinue(formReturn);
			}
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const ParameterModal = ({ part }: { part: number }) => {
	const [moreParameters, setMoreParameters] = useState(false);

	const method = useForm();
	const queryClient = useQueryClient();

	const onSubmit = method.handleSubmit((data) => {
		sendData(data, method, queryClient, moreParameters, part);
	});

	const onCancel = () => {
		method.reset();
		queryClient.refetchQueries();
	};

	return (
		<Modal
			id="parameterModal"
			title="New parameter"
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
			<ParameterForm methods={method} />
			<div className="modal-action">
				<div className="flex flex-row gap-2 w-full items-end">
					<div className="flex flex-col">
						<Checkbox
							handleChange={(event) => setMoreParameters(event.target.checked)}
							id="moreParameters"
							label="Create more parameters?"
							checked={moreParameters}
						/>
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
