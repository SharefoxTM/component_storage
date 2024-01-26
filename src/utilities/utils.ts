import axios, { AxiosError, AxiosResponse } from "axios";
import { APIGetPart } from "../models/APIGetPart.model";
import { toast } from "react-toastify";

const isActive = (pk: string) => {
	axios
		.get(`${process.env.REACT_APP_BE_HOST}parts/${pk}`)
		.then((res: AxiosResponse<APIGetPart>) => {
			if (res.data.active) {
				toast.error("Part is still active");
			}
		})
		.catch((error: AxiosError) => {
			toast.error(error.message);
		});
};

export const deleteItem = async (
	pk: string,
	type: "categories" | "parts" | "storage" | "location" | "company" | "file",
): Promise<number> => {
	const status: number =
		(await axios
			.delete(`${process.env.REACT_APP_BE_HOST}${type}/${pk}`)
			.then((res: AxiosResponse) => {
				return res.status;
			})
			.catch((error: AxiosError) => {
				const e = error.response;
				if (type === "parts") {
					if (e?.status === 405) isActive(pk);
				}
				return e?.status;
			})) || 500;
	return status;
};
