import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type ImageProps = {
	src: string;
	size?: string;
};

type ThumbnailProps = {
	src: ImageProps["src"];
	size?: ImageProps["size"];
	isHoverable?: boolean;
};

const Image = ({ size, src }: ImageProps) => {
	return (
		<div className={size}>
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
	);
};

export const Thumbnail = ({ src, size, isHoverable }: ThumbnailProps) => {
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
					{isHovered && (
						<p className="absolute top-0 left-1 text-black">
							<FontAwesomeIcon icon={faUpload} />
						</p>
					)}
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
