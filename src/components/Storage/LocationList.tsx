import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { Button } from "../Button";

export const LocationList = () => {
	const loc = useQuery({
		queryKey: ["locationTable"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}location/IPs/`)
				.then((res) => res.data),
	});
	return (
		<>
			<ul className="w-full">
				{loc.data?.map((ip: APILocationDetail) => (
					<li
						id={ip.pk.toString()}
						className="w-full"
					>
						<div className="flex w-full flex-row">
							<p className="me-auto">{ip.name}</p>
							<Button
								size="xs"
								variant="info"
								onClick={(e) =>
									axios
										.post(`${process.env.REACT_APP_BE_HOST}storage/init/`, {
											pk: ip.pk,
										})
										.then((data) => data)
										.catch((error) => console.log(error))
								}
							>
								init
							</Button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};
