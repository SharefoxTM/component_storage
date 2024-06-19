import { Modal } from "./Modal";
import { Button } from "../Button";
import axios from "axios";
type viableEndpoints = "location" | "parts" | "category";

const urlToEndpoint = (endpoint: viableEndpoints): string => {
	if (endpoint === "parts") return `${process.env.REACT_APP_BE_HOST}parts`;
	if (endpoint === "category")
		return `${process.env.REACT_APP_BE_HOST}category`;
	return `${process.env.REACT_APP_BE_HOST}location`;
};

const deleteObject = (pk: number, endpoint: viableEndpoints) => {
	axios.delete(urlToEndpoint(endpoint), {
		data: {
			pk: pk,
		},
		headers: {
			Authorization: process.env.REACT_APP_BE_DELETE_TOKEN,
		},
	});
};

type DataProps = {
	name: string;
	pk: number;
	endpoint: viableEndpoints;
};

export const DeleteConfirmationModal = ({ name, pk, endpoint }: DataProps) => {
	return (
		<Modal
			id="deleteConfirmationModal"
			title={`Are you sure you wish to delete ${name}?`}
		>
			<form method="dialog">
				<Button
					size="sm"
					variant="ghost"
					className="btn-circle absolute right-2 top-2"
				>
					✕
				</Button>
			</form>
			<div className="modal-action">
				<form method="delete">
					<Button
						variant="error"
						className="text-white"
						onClick={() => deleteObject(pk, endpoint)}
					>
						Delete
					</Button>
				</form>
				<form method="dialog">
					<Button>Cancel</Button>
				</form>
			</div>
		</Modal>
	);
};
