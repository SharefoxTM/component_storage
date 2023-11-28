type ProgressBarProps = {
	value: number;
	max: number;
};
export const Progressbar = ({ value, max }: ProgressBarProps) => {
	const percentile = (value * 100) / max;
	return (
		<>
			<div className="w-full bg-neutral-600 rounded-full relative h-5">
				<div
					className="bg-primary p-0.5 text-center text-xs font-medium leading-none text-primary-100 rounded-full h-full"
					style={{ width: `${percentile}%` }}
				>
					<p className="absolute text-center align-middle m-0 left-0 right-0 top-1/2 -translate-y-1/2">
						{value} / {max}
					</p>
				</div>
			</div>
		</>
	);
};
