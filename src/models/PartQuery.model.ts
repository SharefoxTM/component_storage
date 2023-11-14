export type PartQuery = {
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
	// limit?: number;
	low_stock?: boolean;
	name_regex?: string;
	// offset?: number;
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
