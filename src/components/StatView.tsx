import { StatViewProps } from "../models/StatViewProps.model";

export const StatView = ({ title, value, description }: StatViewProps) => {
	return (
		<>
			<div className="stat">
				<div className="stat-title">{title}</div>
				<div className="stat-value">{value}</div>
				{description && <div className="stat-desc">{description}</div>}
			</div>
		</>
	);
};
