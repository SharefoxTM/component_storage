export type APIMovingStock = {
	batch: String;
	delete_on_deplete: boolean;
	location_detail_pathstring: string;
	pk: number;
	quantity: number;
	serial: string;
	status: 10 | 50 | 55 | 60 | 65 | 70 | 75 | 85;
	status_text: string;
	supplier_part_SKU: string;
	barcode_hash: string;
};
