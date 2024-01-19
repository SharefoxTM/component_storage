import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "./Input";

export const DeleterForm = ({
	methods,
	name,
}: {
	methods: UseFormReturn;
	name: string;
}) => {
	return (
		<FormProvider {...methods}>
			<form
				id="deleterForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text">
							Please enter "<b>{name}</b>" to confirm deletion.
						</span>
					</div>
					<Input
						id="name"
						placeholder="Name"
						type="text"
						errormsg="Please confirm the name"
						required
					/>
				</div>
			</form>
		</FormProvider>
	);
};
