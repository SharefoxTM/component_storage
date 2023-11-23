type ProgressBarProps = {
	value: number;
	max: number;
};
export const Progressbar = ({ value, max }: ProgressBarProps) => {
	const percentile = (value * 100) / max;
	return (
		<>
			<div className="w-full bg-neutral-600 rounded-full">
				<div
					className="bg-primary p-0.5 text-center text-xs font-medium leading-none text-primary-100 rounded-full"
					style={{ width: `${percentile}%` }}
				>
					{value} / {max}
				</div>
			</div>
		</>
	);
};
