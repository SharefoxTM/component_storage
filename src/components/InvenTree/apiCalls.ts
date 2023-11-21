import { useEffect, useState } from "react";
import { PartQuery } from "../../models/PartQuery.model";


export function createURL(url: string, query: PartQuery): string {
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
	queriedUrl += query?.page !== undefined ? "page=" + query.page + "&" : "";
	queriedUrl +=
		query?.low_stock !== undefined ? "low_stock=" + query.low_stock + "&" : "";
	queriedUrl +=
		query?.name_regex !== undefined
			? "name_regex=" + query.name_regex + "&"
			: "";
	queriedUrl +=
		query?.pageSize !== undefined ? "pageSize=" + query.pageSize + "&" : "";
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
	return queriedUrl;
}

// export type APIParts = {
// 	data: PartsItems;
// 	totalPages: number;
// };
// export const FetchParts = (query: PartQuery): APIParts | undefined => {
// 	fetch(createURL(`${endpoint}parts/`, query), { signal }).then((res) => {
// 					if (!res.ok) {
// 						throw new Error("Failed to fetch");
// 					}
// 					return res.json();
// 				}),
// 		},
// 		queryClient,
// 	);
// 	console.log(fetcher);
// 	return fetcher.data;
// };
const getBase64Image = async (res: Response): Promise<string> => {
	const blob = await res.blob();

	const reader = new FileReader();

	await new Promise((resolve, reject) => {
		reader.onload = resolve;
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
	return reader.result?.toString() ?? "";
};

export const FetchImage = (id: number): string => {
	const [image, setImage] = useState("");
	const [prevId, setPrevId] = useState<number>();
	useEffect(() => {
		const url = process.env.REACT_APP_BE_HOST + `parts/img/${id}`;
		function getData() {
			fetch(url)
				.then(getBase64Image)
				.then((data) => {
					setImage(data);
				})
				.catch((error) => console.log(error));
		}
		if (prevId !== id) {
			setPrevId(id);
			getData();
		}
	}, [id, prevId]);
	return image;
};
