/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from "@tanstack/react-query";
import { CategoryTree } from "../../models/CategoryTree.model";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { NewCategoryModal } from "../Modals/NewCategoryModal";

const renderTreeNodes = (nodes: CategoryTree) => {
	return nodes?.map((node) => (
		<li key={node.pk}>
			{node.children && node.children.length > 0 ? (
				<details>
					<summary>
						<Link to={`/parts/${node.pk}/${node.name}`}>
							{node.name} ({node.part_count})
						</Link>
					</summary>
					<ul>{renderTreeNodes(node.children)}</ul>
				</details>
			) : (
				<Link to={`/parts/${node.pk}/${node.name}`}>
					{node.name} ({node.part_count})
				</Link>
			)}
		</li>
	));
};

export const TreeView = () => {
	const { isLoading, data, error, refetch } = useQuery({
		queryKey: ["categories", "categories/tree/"],
		queryFn: ({ signal }) =>
			fetch(`${process.env.REACT_APP_BE_HOST}categories/tree/`, {
				signal,
			}).then((res) => {
				return res.json();
			}),
	});
	if (error) throw new Error(error.message);
	const categories: CategoryTree = data;

	if (isLoading)
		return (
			<div className="mt-2 mx-2">
				<ul className="menu bg-base-200 w-56 rounded-box">
					<li>
						<span className="loading loading-spinner loading-lg"></span>
					</li>
				</ul>
			</div>
		);

	let totalPartCount = 0;
	categories?.forEach((e) => {
		totalPartCount += e.part_count;
	});
	return (
		<>
			<div className="mt-2 mx-2">
				<ul className="menu bg-base-200 w-56 rounded-box">
					<li>
						<Link to={`/parts/`}>All ({totalPartCount})</Link>
						<ul>{renderTreeNodes(categories)}</ul>
					</li>
					<li className="mt-2">
						<Button
							variant="success"
							size="sm"
							negative
							className="ml-2 overflow-hidden"
							onClick={() => {
								(
									document.getElementById(
										"newCategoryModal",
									)! as HTMLDialogElement
								).showModal();
							}}
						>
							New category
						</Button>
					</li>
				</ul>
			</div>
			<NewCategoryModal updater={refetch} />
		</>
	);
};
