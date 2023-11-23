import { TemplateDetails } from "./TemplateDetail.model";

export type APIPartParameter = {
	pk: number;
	template: number;
	template_detail: TemplateDetails;
	data: string;
	data_numeric: number | null;
};
