/* eslint-disable jsx-a11y/anchor-is-valid */
import { FetchCategories, CategoryParts } from "./InvenTree/categories";

const renderTreeNodes = (nodes: CategoryParts) => {
	return nodes.map((node) => (
		<li key={node.pk}>
			{node.children && node.children.length > 0 ? (
				<details>
					<summary>
						<a>
							{node.name} ({node.part_count})
						</a>
					</summary>
					<ul>{renderTreeNodes(node.children)}</ul>
				</details>
			) : (
				<a>
					{node.name} ({node.part_count})
				</a>
			)}
		</li>
	));
};

const buildTree = (
	nodes: CategoryParts,
	parent: number | null,
): CategoryParts => {
	return nodes
		.filter((node) => node.parent === parent)
		.map((node) => {
			const children = buildTree(nodes, node.pk);
			return { ...node, children };
		});
};

// type TreeViewProps = {
// 	data: CategoryParts;
// };

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
		<ul className="menu bg-base-200 w-56 rounded-box">
			{renderTreeNodes(organizedData)}
		</ul>
	);
};
