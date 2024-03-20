import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "../Input/Input";
import { Select } from "../Input/Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategoryItems } from "../../models/CategoryItems.model";
import { ChangeEvent, useState } from "react";
import { Checkbox } from "../Input/Checkbox";

export const NewCategoryForm = ({ methods }: { methods: UseFormReturn }) => {
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

	return (
		<FormProvider {...methods}>
			<form
				id="newCategoryForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text">Select parent category</span>
					</div>
					<Select
						id="parent"
						methods={methods}
						options={(categories.data as CategoryItems)?.map((val) => ({
							value: val.pk,
							label: val.pathstring,
						}))}
						errormsg="Select the category."
						required={false}
						placeholder="No parent"
					/>
				</div>
				<div className="w-full flex">
					<div className="form-control w-full">
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
				</div>
				<div className="form-control w-full">
					<Checkbox
						id="structural"
						label="Structural?"
						checked={checkedItems.get("structural")}
						handleChange={handleChange}
					/>
					<p>
						Parts may not be directly assigned to a structural category, but may
						be assigned to child categories.
					</p>
				</div>
			</form>
		</FormProvider>
	);
};
