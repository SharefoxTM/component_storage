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
import classNames from "classnames";

type listItemProps = {
	name: string;
	iconParam: IconDefinition;
	disabled?: boolean;
};
const listItemArray: listItemProps[] = [
	{ name: "Parameters", iconParam: faList },
	{ name: "Stock", iconParam: faBoxesStacked },
	{ name: "Build Orders", iconParam: faScrewdriverWrench, disabled: true },
	{ name: "Used In", iconParam: faLayerGroup, disabled: true },
	{ name: "Pricing", iconParam: faDollarSign, disabled: true },
	{ name: "Suppliers", iconParam: faBuilding, disabled: true },
	{ name: "Purchase Orders", iconParam: faShoppingCart, disabled: true },
	{ name: "Scheduling", iconParam: faCalendarDays, disabled: true },
	{ name: "Related Parts", iconParam: faRandom, disabled: true },
	{ name: "Attachments", iconParam: faPaperclip, disabled: true },
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
								className={classNames("flex flex-shrink-0 flex-grow-0 h-12", [
									item.disabled && "pointer-events-none",
								])}
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
