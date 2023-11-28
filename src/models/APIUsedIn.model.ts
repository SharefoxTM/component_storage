export type APIUsedIn = {
	allow_variants: boolean;
	inherited: boolean;
	optional: boolean;
	consumable: boolean;
	part_detail: {
		pk: number;
		barcode_hash: string;
		full_name: string;
		thumbnail: string;
		active: boolean;
		assembly: boolean;
		is_template: boolean;
		purchaseable: boolean;
		salable: boolean;
		trackable: boolean;
		virtual: boolean;
		units: string;
	};
	quantity: number;
};
