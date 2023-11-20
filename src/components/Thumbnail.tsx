import { FetchImage } from "./InvenTree/apiCalls";

export const Thumbnail = ({ id }: { id: number }) => {
	const image: string = FetchImage(id);
	return image === "" ? (
		<div className="avatar placeholder">
			<div className="w-24 border rounded">
				<span className="loading loading-spinner loading-xs"></span>
			</div>
		</div>
	) : image === "data:img/jpeg;base64," ? (
		<div className="avatar placeholder">
			<div className="w-24 border rounded">
				<p>No image</p>
			</div>
		</div>
	) : (
		<div className="avatar">
			<div className="w-24 border rounded">
				<img
					src={image}
					alt="thumbnail for part"
				/>
			</div>
		</div>
	);
};
