import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";

export const DropDownSettings = () => {
	const ref = useOutsideClick(() => {
		document.getElementById("dropdownPartSettings")!.removeAttribute("open");
	});

	return (
		<>
			<div ref={ref}>
				<details
					id="dropdownPartSettings"
					className="dropdown"
				>
					<summary className="btn bg-inherit border-0 m-1">
						<FontAwesomeIcon
							icon={faEllipsis}
							size="lg"
						/>
					</summary>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow bg-gray-900 rounded-box w-20 border-1"
					>
						<li>Edit</li>
						<li>Delete</li>
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
