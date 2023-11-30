export const Thumbnail = ({ src, size }: { src: string; size?: string }) => {
	const sizeClass: string = (size || "w-24") + " rounded aspect-square";
	console.log(src);
	return (
		<div className="relative flex">
			<div className={sizeClass}>
				{src !== null && (
					<img
						className="h-full w-full object-contain"
						src={`${process.env.REACT_APP_BE_HOST}parts${src}`}
						alt="thumbnail for part"
						loading="lazy"
					/>
				)}
				{src === null && (
					<img
						className="h-full w-full object-contain"
						src={`${process.env.REACT_APP_BE_HOST}parts/static/img/blank_image.thumbnail.png`}
						alt="thumbnail for part"
						loading="lazy"
					/>
				)}
			</div>
		</div>
	);
};
