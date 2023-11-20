/* eslint-disable jsx-a11y/anchor-is-valid */
import { CategoryTree } from "../models/CategoryTree.model";
import { FetchCategoryTree } from "./InvenTree/apiCalls";
import { Link } from "react-router-dom";

const renderTreeNodes = (nodes: CategoryTree) => {
	return nodes.map((node) => (
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
	const categories = FetchCategoryTree();
	if (!categories)
		return (
			<ul className="menu bg-base-200 w-56 rounded-box">
				<li>
					<span className="loading loading-spinner loading-lg"></span>
				</li>
			</ul>
		);
	let totalPartCount = 0;
	categories.forEach((e) => {
		totalPartCount += e.part_count;
	});
	return (
		<div className="mt-2 mx-2">
			<ul className="menu bg-base-200 w-56 rounded-box">
				<li>
					<Link to={`/parts/`}>All ({totalPartCount})</Link>
					<ul>{renderTreeNodes(categories)}</ul>
				</li>
			</ul>
		</div>
	);
};
