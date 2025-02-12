import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryTree } from "../../models/CategoryTree.model";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Modal } from "../Modals/Modal";
import { NewCategoryForm } from "../Form/NewCategoryForm";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";

const renderTreeNodes = (nodes: CategoryTree) => {
	return nodes?.map((node) => (
		<li key={node.pk}>
			{node.children && node.children.length > 0 ? (
				<details>
					<summary>
						<Link to={`/${node.name}`}>
							{node.name} ({node.part_count})
						</Link>
					</summary>
					<ul>{renderTreeNodes(node.children)}</ul>
				</details>
			) : (
				<Link to={`/${node.name}`}>
					{node.name} ({node.part_count})
				</Link>
			)}
		</li>
	));
};

const postData = (data: FieldValues, queryClient: QueryClient) => {
	axios
		.post(`${process.env.REACT_APP_API_URL}categories/`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			if (res.status === 201) {
				(
					document.getElementById("newCategoryModal")! as HTMLDialogElement
				).close();
				queryClient.refetchQueries({
					queryKey: ["categories", "categories/tree/"],
				});
			}
		})
		.catch((r) => {
			console.log(r.message);
		});
};

export const TreeView = () => {
	const { isLoading, data, error } = useQuery({
		queryKey: ["categories", "categories/tree/"],
		queryFn: ({ signal }) =>
			fetch(`${process.env.REACT_APP_API_URL}categories/tree/`, {
				signal,
			}).then((res) => {
				return res.json();
			}),
	});
	if (error) throw new Error(error.message);
	const categories: CategoryTree = data;
	const newCategoryMethods = useForm();
	const queryClient = useQueryClient();

	const onCancel = () => {
		newCategoryMethods.reset();
	};

	const onSubmit = newCategoryMethods.handleSubmit((data) => {
		if (data.parent.value === undefined) data.parent = null;
		else data.parent = data.parent.value;
		postData(data, queryClient);
	});

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
	try {
		let totalPartCount = 0;
		categories?.forEach((e) => {
			totalPartCount += e.part_count;
		});
		return (
			<>
				<div className="mt-2 mx-2">
					<ul className="menu bg-base-200 w-56 rounded-box">
						<li>
							<Link to={`/`}>All ({totalPartCount})</Link>
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
				<Modal
					id="newCategoryModal"
					title="New category"
					submitTitle="Submit"
					onSubmit={onSubmit}
					onCancel={onCancel}
				>
					<NewCategoryForm methods={newCategoryMethods} />
				</Modal>
			</>
		);
	} catch {
		return (
			<div className="mt-2 mx-2">
				<ul className="menu bg-base-200 w-56 rounded-box">
					<li>
						<p> Error 500: Can't reach server </p>
					</li>
				</ul>
			</div>
		);
	}
};
