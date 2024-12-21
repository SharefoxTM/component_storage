import { useState } from "react";

type ImageProps = {
	src: string;
	size?: string;
};

type ThumbnailProps = {
	src: ImageProps["src"];
	size?: ImageProps["size"];
	isHoverable?: boolean;
	HoverElement?: JSX.Element;
};

const Image = ({ size, src }: ImageProps) => {
	return (
		<div className={size}>
			{src !== null && (
				<img
					className="h-full w-full object-contain"
					src={`${process.env.REACT_APP_API_URL}file${src}`}
					alt="thumbnail for part"
					loading="lazy"
				/>
			)}
			{src === null && (
				<img
					className="h-full w-full object-contain"
					src={`${process.env.REACT_APP_API_URL}file/static/img/blank_image.thumbnail.png`}
					alt="thumbnail for part"
					loading="lazy"
				/>
			)}
		</div>
	);
};

export const Thumbnail = ({
	src,
	size,
	isHoverable,
	HoverElement,
}: ThumbnailProps) => {
	const sizeClass: string = (size || "w-24") + " rounded aspect-square";
	const [isHovered, setHover] = useState(false);

	return (
		<div className="relative flex">
			{(isHoverable && (
				<div
					onMouseOver={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					className="hover:cursor-pointer"
				>
					<Image
						size={sizeClass}
						src={src}
					/>
					{isHovered && HoverElement}
				</div>
			)) || (
				<Image
					size={sizeClass}
					src={src}
				/>
			)}
		</div>
	);
};
