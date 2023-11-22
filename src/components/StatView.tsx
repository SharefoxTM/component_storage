import { StatViewProps } from "../models/StatViewProps.model";

export const StatView = ({ title, description, children }: StatViewProps) => {
	return (
		<>
			<div className="stat">
				<div className="stat-title">{title}</div>
				<div className="stat-value font-medium text-3xl text-white">
					{children}
				</div>
				{description && <div className="stat-desc">{description}</div>}
			</div>
		</>
	);
};
