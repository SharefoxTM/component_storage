import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";
import { Button } from "../Button";
import { deleteItem } from "../../utilities/utils";
import { useNavigate, useParams } from "react-router-dom";

export const DropDownSettings = () => {
	const nav = useNavigate();
	const submitDelete = async () => {
		const status: number = await deleteItem(param.partID!, "parts");
		if (status === 204) nav("/parts");
	};
	const ref = useOutsideClick(() => {
		document.getElementById("dropdownPartSettings")!.removeAttribute("open");
	});

	const param = useParams();

	return (
		<>
			<div ref={ref}>
				<details
					id="dropdownPartSettings"
					className="dropdown"
				>
					<summary className="btn bg-inherit border-0">
						<FontAwesomeIcon
							icon={faEllipsis}
							size="lg"
						/>
					</summary>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow bg-gray-900 rounded-box w-20 border-1"
					>
						<li>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => {
									(
										document.getElementById(
											"partNewEditModal",
										)! as HTMLDialogElement
									).showModal();
								}}
							>
								Edit
							</Button>
						</li>
						<li>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => {
									submitDelete();
								}}
							>
								Delete
							</Button>
						</li>
					</ul>
				</details>
			</div>
		</>
	);
};

const useOutsideClick = (callback: () => void) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [callback]);

	return ref;
};
