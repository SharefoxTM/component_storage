import axios, { AxiosError, AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
export const deleteItem = (
	pk: string,
	type: "categories" | "parts" | "storage" | "location" | "company" | "file",
) => {
	axios
		.delete(`${process.env.REACT_APP_BE_HOST}${type}/${pk}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res: AxiosResponse) => {
			if (res.status === 204) {
				if (type === "parts") redirect("/parts");
			}
		})
		.catch((error: AxiosError) => {
			const e = error.response;
			if (type === "parts") {
				if (e?.status === 405) console.log("Is part still active?");
			}
		});
};
