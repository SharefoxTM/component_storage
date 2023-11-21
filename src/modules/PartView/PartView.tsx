import { MainContent } from "../../components/PartView/MainContent";
import { PartViewSideBar } from "../../components/PartView/SideBar";
import { PartViewSideDetail } from "../../components/PartView/SideBarDetail";

export const PartView = () => {
	return (
		<>
			<div className="flex flex-col md:flex-shrink-0 md:flex-row">
				<div className="md:basis-2/12">
					<PartViewSideBar />
				</div>
				<div className="md:basis-4/12">
					<MainContent />
				</div>
				<PartViewSideDetail />
			</div>
		</>
	);
};
