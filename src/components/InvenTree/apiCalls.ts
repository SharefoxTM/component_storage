import { useEffect, useState } from "react";

export type CategoryItems = {
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
	children?: CategoryItems;
}[];

export const FetchCategories = (token: string | undefined): CategoryItems => {
	const [categories, setCategories] = useState<CategoryItems>();
	useEffect(() => {
		function getData() {
			fetch(process.env.REACT_APP_DB_HOST + "/api/part/category/", {
				headers: new Headers({
					Authorization: token ?? "",
				}),
			})
				.then((response) => response.json())
				.then((data: CategoryItems) => {
					console.log(data);
					setCategories(data);
				})
				.catch((error) => console.log(error));
		}
		if (!categories) getData();
	}, [token, categories]);
	return categories!;
};

export type PartsItems = {
	active: boolean;
	assembly: boolean;
	barcode_hash: string;
	category: number;
	component: boolean;
	default_expiry: number;
	default_location: number;
	default_supplier: number;
	description: string;
	full_name: string;
	image: string;
	IPN: string;
	is_template: boolean;
	keywords: string;
	last_stocktake: string;
	link: string;
	minimum_stock: number;
	name: string;
	notes: string;
	pk: number;
	purchaseable: boolean;
	revision: string;
	salable: boolean;
	starred: string;
	thumbnail: string;
	trackable: boolean;
	units: string;
	variant_of: number;
	virtual: boolean;
	responsible: number;
	allocated_to_build_orders: number;
	allocated_to_sales_orders: number;
	building: number;
	in_stock: number;
	ordering: number;
	required_for_build_orders: number;
	stock_item_count: number;
	suppliers: number;
	total_in_stock: number;
	unallocated_stock: number;
	variant_stock: number;
	tags: string[];
}[];

export type PartProps = {
	IPN?: string; //Filter by exact IPN (internal part number)
	IPN_regex?: string; //Filter by regex on IPN (internal part number)
	active?: boolean;
	ancestor?: string;
	assembly?: boolean;
	component?: boolean;
	category?: number;
	convert_from?: string;
	created_after?: string; //Needs to be date format
	created_before?: string; //Needs to be date format
	depleted_stock?: boolean;
	exclude_tree?: string;
	has_ipn?: boolean;
	has_pricing?: boolean;
	has_stock?: boolean;
	has_units?: boolean;
	in_bom_for?: string;
	is_template?: boolean;
	low_stock?: boolean;
	name_regex?: string;
	ordering?: string; //Which field to use when ordering the results.
	purchaseable?: boolean;
	salable?: boolean;
	search?: string; //A search term.
	stock_to_build?: boolean;
	stocktake?: boolean;
	tags_name?: string;
	tags_slug?: string;
	trackable?: boolean;
	unallocated_stock?: boolean;
	variant_of?: number;
	virtual?: boolean;
};

function createURL(url: string, query: PartProps): string {
	console.log(query);
	let queriedUrl = url;
	queriedUrl += query !== undefined ? "?" : "";
	queriedUrl += query?.IPN !== undefined ? "IPN=" + query.IPN + "&" : "";
	queriedUrl +=
		query?.IPN_regex !== undefined ? "IPN_regex=" + query.IPN_regex + "&" : "";
	queriedUrl +=
		query?.active !== undefined ? "active=" + query.active + "&" : "";
	queriedUrl +=
		query?.ancestor !== undefined ? "ancestor=" + query.ancestor + "&" : "";
	queriedUrl +=
		query?.assembly !== undefined ? "assembly=" + query.assembly + "&" : "";
	queriedUrl +=
		query?.component !== undefined ? "component=" + query.component + "&" : "";
	queriedUrl +=
		query?.category !== undefined ? "category=" + query.category + "&" : "";
	queriedUrl +=
		query?.convert_from !== undefined
			? "convert_from=" + query.convert_from + "&"
			: "";
	queriedUrl +=
		query?.created_after !== undefined
			? "created_after=" + query.created_after + "&"
			: "";
	queriedUrl +=
		query?.created_before !== undefined
			? "created_before=" + query.created_before + "&"
			: "";
	queriedUrl +=
		query?.depleted_stock !== undefined
			? "depleted_stock=" + query.depleted_stock + "&"
			: "";
	queriedUrl +=
		query?.exclude_tree !== undefined
			? "exclude_tree=" + query.exclude_tree + "&"
			: "";
	queriedUrl +=
		query?.has_ipn !== undefined ? "has_ipn=" + query.has_ipn + "&" : "";
	queriedUrl +=
		query?.has_pricing !== undefined
			? "has_pricing=" + query.has_pricing + "&"
			: "";
	queriedUrl +=
		query?.has_stock !== undefined ? "has_stock=" + query.has_stock + "&" : "";
	queriedUrl +=
		query?.has_units !== undefined ? "has_units=" + query.has_units + "&" : "";
	queriedUrl +=
		query?.in_bom_for !== undefined
			? "in_bom_for=" + query.in_bom_for + "&"
			: "";
	queriedUrl +=
		query?.is_template !== undefined
			? "is_template=" + query.is_template + "&"
			: "";
	queriedUrl +=
		query?.low_stock !== undefined ? "low_stock=" + query.low_stock + "&" : "";
	queriedUrl +=
		query?.name_regex !== undefined
			? "name_regex=" + query.name_regex + "&"
			: "";
	queriedUrl +=
		query?.ordering !== undefined ? "ordering=" + query.ordering + "&" : "";
	queriedUrl +=
		query?.purchaseable !== undefined
			? "purchaseable=" + query.purchaseable + "&"
			: "";
	queriedUrl +=
		query?.salable !== undefined ? "salable=" + query.salable + "&" : "";
	queriedUrl +=
		query?.search !== undefined ? "search=" + query.search + "&" : "";
	queriedUrl +=
		query?.stock_to_build !== undefined
			? "stock_to_build=" + query.stock_to_build + "&"
			: "";
	queriedUrl +=
		query?.stocktake !== undefined ? "stocktake=" + query.stocktake + "&" : "";
	queriedUrl +=
		query?.tags_name !== undefined ? "tags_name=" + query.tags_name + "&" : "";
	queriedUrl +=
		query?.tags_slug !== undefined ? "tags_slug=" + query.tags_slug + "&" : "";
	queriedUrl +=
		query?.trackable !== undefined ? "trackable=" + query.trackable + "&" : "";
	queriedUrl +=
		query?.unallocated_stock !== undefined
			? "unallocated_stock=" + query.unallocated_stock + "&"
			: "";
	queriedUrl +=
		query?.variant_of !== undefined
			? "variant_of=" + query.variant_of + "&"
			: "";
	queriedUrl += query?.virtual !== undefined ? "virtual=" + query.virtual : "";
	console.log(queriedUrl);
	return queriedUrl;
}

export const FetchParts = (
	token: string | undefined,
	query: PartProps,
): PartsItems => {
	const [parts, setParts] = useState<PartsItems>();
	const [prevUrl, setPrevUrl] = useState("");
	useEffect(() => {
		const url = createURL(process.env.REACT_APP_DB_HOST + "/api/part/", query);
		function getData() {
			fetch(url, {
				headers: new Headers({
					Authorization: token ?? "",
				}),
			})
				.then((response) => response.json())
				.then((data: PartsItems) => {
					setParts(data);
				})
				.catch((error) => console.log(error));
		}
		if (prevUrl !== url) {
			setPrevUrl(url);
			getData();
		}
	});
	return parts!;
};
