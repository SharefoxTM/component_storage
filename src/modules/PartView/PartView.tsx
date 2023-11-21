import { MainContent } from "./MainContent";
import { PartViewSideBar } from "../../components/PartView/SideBar";
import { PartViewSideDetail } from "../../components/PartView/SideBarDetail";

export const PartView = () => {
	return (
		<>
			<div className="flex flex-col md:flex-shrink-0 md:flex-row">
				<div className="md:basis-1/5">
					<PartViewSideBar />
				</div>
				<div className="md:basis-3/5">
					<MainContent />
				</div>
				<PartViewSideDetail />
			</div>
		</>
	);
};
