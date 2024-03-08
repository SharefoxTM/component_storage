import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { Select } from "./Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategoryItems } from "../../models/CategoryItems.model";
import { ChangeEvent, useState } from "react";
import { Checkbox } from "./Checkbox";
import { useEffectOnce } from "usehooks-ts";
import { Textarea } from "./Textarea";

export const NewPartForm = ({ methods }: { methods: UseFormReturn }) => {
	const categories = useQuery({
		queryKey: ["categories"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}categories/`)
				.then((res) => res.data),
	});

	const [checkedItems, setCheckedItems] = useState(new Map());

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		checkedItems.set(event.target.id, event.target.checked);
		setCheckedItems(new Map(checkedItems));
	};

	const checkboxes = [
		{
			id: "assembly",
			label: "Assembly",
			checked: false,
		},
		{
			id: "component",
			label: "Is component?",
			checked: true,
		},
		{
			id: "is_template",
			label: "Is template?",
			checked: false,
		},
		{
			id: "purchaseable",
			label: "Is purchaseable?",
			checked: true,
		},
		{
			id: "salable",
			label: "Is salable?",
			checked: false,
		},
		{
			id: "virtual",
			label: "Is virtual?",
			checked: false,
		},
	];

	useEffectOnce(() => {
		checkboxes.map((CB) => checkedItems.set(CB.id, CB.checked));
		setCheckedItems(new Map(checkedItems));
	});

	return (
		<FormProvider {...methods}>
			<form
				id="newPartForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text">Select category *</span>
					</div>
					<Select
						id="category"
						methods={methods}
						options={(categories.data as CategoryItems)?.map((val) => ({
							value: val.pk,
							label: val.pathstring,
						}))}
						errormsg="Select the category."
					/>
				</div>
				<div className="w-full flex gap-2">
					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Name *</span>
						</div>
						<Input
							id="name"
							placeholder="Name"
							type="text"
							errormsg="Please fill in the name"
							required
						/>
					</div>
					<div className="form-control w-1/2">
						<div className="label">
							<span className="label-text">Minimal stock</span>
						</div>
						<Input
							id="minimum_stock"
							placeholder="Minimal stock"
							type="number"
						/>
					</div>
				</div>
				<div className="w-full flex">
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text">Description</span>
						</div>
						<Textarea
							id="description"
							placeholder="Description for this item"
						/>
					</div>
				</div>
				<div className="w-full flex flex-wrap gap-2">
					{checkboxes.map((item, key) => (
						<>
							<div className="form-control w-1/4">
								<Checkbox
									key={key}
									id={item.id}
									label={item.label}
									checked={checkedItems.get(item.id)}
									handleChange={handleChange}
								/>
							</div>
						</>
					))}
				</div>
			</form>
		</FormProvider>
	);
};
