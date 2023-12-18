type ProgressBarProps = {
	value: number;
	max: number;
};
export const Progressbar = ({ value, max }: ProgressBarProps) => {
	const percentile = (value * 100) / max;
	return (
		<div className="w-full bg-neutral-600 rounded-full overflow-hidden relative h-5">
			<div
				className="bg-primary h-full"
				style={{ width: `${percentile}%` }}
			/>
			<p className="absolute text-center text-white m-0 left-0 right-0 top-1/2 -translate-y-1/2 text-sm">
				{value} / {max}
			</p>
		</div>
	);
};
