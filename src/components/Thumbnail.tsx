import { FetchImage } from "./InvenTree/apiCalls";

export const Thumbnail = ({ id, size }: { id: number; size?: string }) => {
	const sizeClass: string = (size || "w-24") + " rounded aspect-square";
	const image: string = FetchImage(id);

	return image === "" ? (
		<div className="avatar placeholder w-fit">
			<div className={sizeClass}>
				<span className="loading loading-spinner loading-xs"></span>
			</div>
		</div>
	) : image === "data:img/jpeg;base64," ? (
		<div className="avatar placeholder">
			<div className={sizeClass}>
				<p>No image</p>
			</div>
		</div>
	) : (
		<div className="relative flex">
			<div className={sizeClass}>
				<img
					className="h-full w-full object-contain"
					src={image}
					alt="thumbnail for part"
				/>
			</div>
		</div>
	);
};
