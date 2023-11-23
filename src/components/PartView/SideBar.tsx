import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	IconDefinition,
	faBoxesStacked,
	faBuilding,
	faCalendarDays,
	faDollarSign,
	faLayerGroup,
	faList,
	faPaperclip,
	faRandom,
	faScrewdriverWrench,
	faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

type listItemProps = {
	name: string;
	iconParam: IconDefinition;
};
const listItemArray: listItemProps[] = [
	{ name: "Parameters", iconParam: faList },
	{ name: "Stock", iconParam: faBoxesStacked },
	{ name: "Build Orders", iconParam: faScrewdriverWrench },
	{ name: "Used In", iconParam: faLayerGroup },
	{ name: "Pricing", iconParam: faDollarSign },
	{ name: "Suppliers", iconParam: faBuilding },
	{ name: "Purchase Orders", iconParam: faShoppingCart },
	{ name: "Scheduling", iconParam: faCalendarDays },
	{ name: "Related Parts", iconParam: faRandom },
	{ name: "Attachments", iconParam: faPaperclip },
];

export const PartViewSideBar = ({
	setter,
}: {
	setter: React.Dispatch<React.SetStateAction<string>>;
}) => {
	function handleClick(e: React.MouseEvent<HTMLElement>) {
		setter(e.currentTarget.id);
	}
	return (
		<>
			<div className="mt-2 mx-2">
				<ul className="menu bg-base-200 w-56 rounded-box text-white">
					{listItemArray.map((item, index) => (
						<li key={index}>
							<div
								className="flex flex-shrink-0 flex-grow-0 h-12"
								id={item.name}
								onClick={handleClick}
							>
								<div className="basis-1/4">
									<FontAwesomeIcon icon={item.iconParam} />
								</div>
								{item.name}
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
