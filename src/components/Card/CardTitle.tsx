export const CardTitle = ({ children }: { children?: React.ReactNode }) => {
	return (
		<>
			<div className="w-full">
				<div className="flex items-center justify-between border-b border-gray-500 rounded-t-lg pl-4">
					{children}
				</div>
			</div>
		</>
	);
};
