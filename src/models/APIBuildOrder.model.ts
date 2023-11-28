export type APIBuildOrder = {
	build: number;
	install_into: number;
	stock_item: number;
	quantity: number;
	build_detail: {
		pk: number;
		url: string;
		title: string;
		barcode_hash: string;
		batch: string;
		creation_date: string;
		completed: number;
		completion_date: number;
		destination: number;
		parent: number;
		part: number;
		project_code: number;
		project_code_detail: number;
		reference: string;
		quantity: number;
		status: 10 | 20 | 30 | 40;
		status_text: string;
		target_date: number;
		take_from: number;
		priority: number;
	};
};
