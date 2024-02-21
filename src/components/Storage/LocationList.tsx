import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APILocationDetail } from "../../models/APILocationDetail.model";
import { Button } from "../Button";
import { StorageNewEditModal } from "../Modals/StorageNewEditModal";

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
			<ul className="w-full space-y-2">
				{loc.data?.map((ip: APILocationDetail, key: number) => (
					<li
						id={ip.pk.toString()}
						className="w-full"
						key={key}
					>
						<div className="flex w-full flex-row gap-2">
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
							<Button
								size="xs"
								variant="info"
								onClick={(e) =>
									axios
										.post(
											`${process.env.REACT_APP_BE_HOST}storage/mode/`,
											JSON.stringify({
												mode: "NORMAL",
												ip: ip.name,
											}),
											{
												headers: {
													"Content-Type": "application/json",
												},
											},
										)
										.then((res) => res.data)
										.catch((r) => {
											console.log(r.message);
										})
								}
							>
								Normal
							</Button>
							<Button
								size="xs"
								variant="info"
								onClick={(e) =>
									axios
										.post(
											`${process.env.REACT_APP_BE_HOST}storage/mode/`,
											JSON.stringify({
												mode: "VEGAS",
												ip: ip.name,
											}),
											{
												headers: {
													"Content-Type": "application/json",
												},
											},
										)
										.then((res) => res.data)
										.catch((r) => {
											console.log(r.message);
										})
								}
							>
								Vegas
							</Button>
							<Button
								size="xs"
								variant="info"
								onClick={(e) =>
									axios
										.post(
											`${process.env.REACT_APP_BE_HOST}storage/mode/`,
											JSON.stringify({
												mode: "KR",
												ip: ip.name,
											}),
											{
												headers: {
													"Content-Type": "application/json",
												},
											},
										)
										.then((res) => res.data)
										.catch((r) => {
											console.log(r.message);
										})
								}
							>
								Knight Rider
							</Button>
						</div>
					</li>
				))}
			</ul>
			<StorageNewEditModal refetch={loc.refetch} />
		</>
	);
};
