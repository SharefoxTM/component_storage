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
