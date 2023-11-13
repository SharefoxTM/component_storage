import { useEffect, useState } from "react";

export type CategoryParts = {
	pk: number;
	name: string;
	description: string;
	default_location: number;
	default_keywords: string;
	level: number;
	parent: number;
	part_count: number;
	pathstring: string;
	starred: string;
	url: string;
	structural: boolean;
	icon: string;
	children?: CategoryParts;
}[];

export const FetchCategories = (token: string | undefined): CategoryParts => {
	const [categories, setCategories] = useState<CategoryParts>();
	useEffect(() => {
		function getData() {
			fetch(process.env.REACT_APP_DB_HOST + "/api/part/category/", {
				headers: new Headers({
					Authorization: token ?? "",
				}),
			})
				.then((response) => response.json())
				.then((data: CategoryParts) => {
					console.log(data);
					setCategories(data);
				})
				.catch((error) => console.log(error));
		}
		if (!categories) getData();
	}, [token, categories]);
	return categories!;
};
