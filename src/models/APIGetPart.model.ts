export type APIGetPart = {
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
	minimum_stock: number;
	name: string;
	pk: number;
	purchaseable: boolean;
	revision: string;
	salable: boolean;
	starred: string;
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
};