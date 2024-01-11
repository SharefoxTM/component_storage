export const Thumbnail = ({ src, size }: { src: string; size?: string }) => {
	const sizeClass: string = (size || "w-24") + " rounded aspect-square";
	return (
		<div className="relative flex">
			<div className={sizeClass}>
				{src !== null && (
					<img
						className="h-full w-full object-contain"
						src={`${process.env.REACT_APP_BE_HOST}file${src}`}
						alt="thumbnail for part"
						loading="lazy"
					/>
				)}
				{src === null && (
					<img
						className="h-full w-full object-contain"
						src={`${process.env.REACT_APP_BE_HOST}file/static/img/blank_image.thumbnail.png`}
						alt="thumbnail for part"
						loading="lazy"
					/>
				)}
			</div>
		</div>
	);
};
