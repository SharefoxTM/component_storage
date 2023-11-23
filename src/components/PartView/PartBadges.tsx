import { APIGetPart } from "../../models/APIGetPart.model";
import { Badge } from "../Badge";

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
			<div className="flex align-middle mt-1 gap-2">
				{badges.map((name, key) => (
					<Badge
						key={key}
						variant="error"
						size="lg"
						className="bg-primary"
					>
						{name}
					</Badge>
				))}
			</div>
		</>
	);
};
