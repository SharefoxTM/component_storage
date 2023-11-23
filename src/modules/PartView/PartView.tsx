import { MainContent } from "../../components/PartView/MainContent";
import { PartViewSideBar } from "../../components/PartView/SideBar";
import { PartViewSideDetail } from "../../components/PartView/SideBarDetail";
import { useState } from "react";

export const PartView = () => {
	const [sideDetailTopic, setSideDetailTopic] = useState("Parameters");
	return (
		<>
			<div className="flex flex-col w-full md:flex-shrink-0 md:flex-row">
				<div className="md:basis-2/12">
					<PartViewSideBar setter={setSideDetailTopic} />
				</div>
				<div className="flex flex-col md:flex-shrink-0 md:basis-10/12">
					<div className="flex w-full">
						<div className="basis-1/2 md:shrink-0">
							<MainContent />
						</div>
					</div>
					<div className="flex w-full">
						<div className="basis-10/12">
							<PartViewSideDetail topic={sideDetailTopic} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
