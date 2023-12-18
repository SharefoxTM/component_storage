import { CardTitle } from "./CardTitle";
import { CardBody } from "./CardBody";

const CardContainer = ({ children }: { children?: React.ReactNode }) => {
	return (
		<>
			<div className="card shadow-xl bg-gray-800 rounded-box flex md:flex-shrink-0 justify-between my-2">
				{children}
			</div>
		</>
	);
};

const Card = {
	CardContainer,
	CardTitle,
	CardBody,
};

export default Card;
