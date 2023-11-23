export const CardBody = ({ children }: { children?: React.ReactNode }) => {
	return (
		<>
			<div className="p-4 flex md:flex-row md:flex-shrink-0 justify-between">
				{children}
			</div>
		</>
	);
};
