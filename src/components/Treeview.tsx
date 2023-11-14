/* eslint-disable jsx-a11y/anchor-is-valid */
import { FetchCategories, CategoryItems } from "./InvenTree/apiCalls";
import { Link } from "react-router-dom";

const renderTreeNodes = (nodes: CategoryItems) => {
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

const buildTree = (
	nodes: CategoryItems,
	parent: number | null,
): CategoryItems => {
	return nodes
		.filter((node) => node.parent === parent)
		.map((node) => {
			const children = buildTree(nodes, node.pk);
			return { ...node, children };
		});
};

export const TreeView = () => {
	const categories = FetchCategories(process.env.REACT_APP_DB_TOKEN);
	if (!categories)
		return (
			<ul className="menu bg-base-200 w-56 rounded-box">
				<li>Still loading...</li>
			</ul>
		);
	const organizedData = buildTree(categories, null);
	return (
		<div className="mt-2 mx-2">
			<ul className="menu bg-base-200 w-56 rounded-box">
				{renderTreeNodes(organizedData)}
			</ul>
		</div>
	);
};
