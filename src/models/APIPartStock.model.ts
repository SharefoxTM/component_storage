export type APIPartStock = {
	batch: string;
	build: number;
	expiry_date: string;
	is_building: boolean;
	link: string;
	location: number;
	packaging: string;
	part: number;
	pk: number;
	quantity: number;
	serial: string;
	status: 10 | 50 | 55 | 60 | 65 | 70 | 75 | 85;
	status_text: string;
	supplier_part: number;
	barcode_hash: string;
	updated: string;
	purchase_price: string;
	purchase_price_currency:
		| "AUD"
		| "CAD"
		| "CNY"
		| "EUR"
		| "GBP"
		| "JPY"
		| "NZD"
		| "USD";
	allocated: number;
	expired: boolean;
	installed_items: number;
	stale: boolean;
	tracking_items: number;
	tags: string[];
};
