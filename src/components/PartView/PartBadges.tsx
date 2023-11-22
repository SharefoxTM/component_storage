import { APIGetPart } from "../../models/APIGetPart.model";

function createBadgeArray(part: APIGetPart): string[] {
	let arr = new Array<string>();
	if (part.active) arr.push("active");
	if (part.assembly) arr.push("assembly");
	if (part.component) arr.push("component");
	if (part.is_template) arr.push("is_template");
	if (part.purchaseable) arr.push("purchaseable");
	if (part.salable) arr.push("salable");
	if (part.starred) arr.push("starred");
	if (part.trackable) arr.push("trackable");
	if (part.virtual) arr.push("virtual");
	return arr;
}

type PartBadgesProps = {
	part: APIGetPart;
};
export const PartBadges = ({ part }: PartBadgesProps) => {
	const badges: string[] = createBadgeArray(part);
	return (
		<>
			<div className="flex">
				{badges.map((name, key) => (
					<div
						key={key}
						className="h-6 text-xs font-medium m-2 ms-0 my-2.5 px-2.5 py-0.5 rounded-full bg-blue-700 text-white align-baseline"
					>
						{name}
					</div>
				))}
			</div>
		</>
	);
};
