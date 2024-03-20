import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "../Input/Input";
import { Select } from "../Input/Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategoryItems } from "../../models/CategoryItems.model";
import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox } from "../Input/Checkbox";
import { useEffectOnce } from "usehooks-ts";
import { Textarea } from "../Input/Textarea";
import { Option } from "../../models/Option.model";

type PartNewEditFormProps = {
	methods: UseFormReturn;
	data?: {
		pk: string;
		active: boolean;
		assembly: boolean;
		component: boolean;
		is_template: boolean;
		purchaseable: boolean;
		salable: boolean;
		trackable: boolean;
		virtual: boolean;
		name: string;
		category: number;
		minimum_stock: number;
		description: string;
	};
	isLoading?: boolean;
	setter?: React.Dispatch<React.SetStateAction<Option | undefined>>;
};

export const PartNewEditForm = ({
	methods,
	data,
	isLoading = false,
	setter,
}: PartNewEditFormProps) => {
	const categories = useQuery({
		queryKey: ["categories"],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BE_HOST}categories/`)
				.then((res) => res.data),
	});

	const [checkedItems, setCheckedItems] = useState(new Map());
	const [selectedCategory, setSelectedCategory] = useState<Option>();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		checkedItems.set(event.target.id, event.target.checked);
		setCheckedItems(new Map(checkedItems));
	};

	const checkboxes = [
		{
			id: "active",
			label: "Active?",
			checked: data?.active !== undefined ? data.active : true,
		},
		{
			id: "assembly",
			label: "Assembly",
			checked: data?.assembly !== undefined ? data.assembly : false,
		},
		{
			id: "component",
			label: "Is component?",
			checked: data?.component !== undefined ? data.component : true,
		},
		{
			id: "is_template",
			label: "Is template?",
			checked: data?.is_template !== undefined ? data.is_template : false,
		},
		{
			id: "purchaseable",
			label: "Is purchaseable?",
			checked: data?.purchaseable !== undefined ? data.purchaseable : true,
		},
		{
			id: "salable",
			label: "Is salable?",
			checked: data?.salable !== undefined ? data.salable : false,
		},
		{
			id: "trackable",
			label: "Is trackable?",
			checked: data?.trackable !== undefined ? data.trackable : false,
		},
		{
			id: "virtual",
			label: "Is virtual?",
			checked: data?.virtual !== undefined ? data.virtual : false,
		},
	];

	useEffectOnce(() => {
		checkboxes.map((CB) => checkedItems.set(CB.id, CB.checked));
		setCheckedItems(new Map(checkedItems));
	});

	useEffect(() => {
		if (data !== undefined) {
			if (!categories.isLoading) {
				const filtArray = (categories.data as CategoryItems)
					?.filter((obj) => {
						return obj.pk === data?.category;
					})
					.map(
						(val): Option => ({
							value: val.pk,
							label: val.pathstring,
						}),
					);
				setSelectedCategory(filtArray[0]);
				methods.setValue("name", data.name);
				methods.setValue("minimum_stock", data.minimum_stock);
				methods.setValue("description", data.description);
			}
		}
	}, [categories.data, categories.isLoading, data, methods]);

	useEffect(() => {
		if (setter !== undefined) setter(selectedCategory);
	}, [selectedCategory, setter, methods]);

	return (
		<FormProvider {...methods}>
			<form
				id="newPartForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				{isLoading && <div>Data is being loaded, please wait...</div>}
				{!isLoading && (
					<>
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
								required={data === undefined}
								value={selectedCategory}
								setter={setSelectedCategory}
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
								<div
									className="form-control w-1/4"
									key={key}
								>
									<Checkbox
										id={item.id}
										label={item.label}
										checked={checkedItems.get(item.id)}
										handleChange={handleChange}
									/>
								</div>
							))}
						</div>
					</>
				)}
			</form>
		</FormProvider>
	);
};
