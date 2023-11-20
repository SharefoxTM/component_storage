export type CategoryTree = {
	pk: number;
	name: string;
	part_count: number;
	children?: CategoryTree;
}[];
