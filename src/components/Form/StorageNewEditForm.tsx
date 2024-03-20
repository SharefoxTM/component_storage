import { FormProvider, UseFormReturn } from "react-hook-form";
import { Input } from "../Input/Input";

type StorageNewEditFormProps = {
	methods: UseFormReturn;
	data?: {
		ip: string;
		structural?: boolean;
		external?: boolean;
		description?: string;
		parent?: number;
		pathstring?: string;
		owner?: number;
		icon?: string;
		tags?: string[];
	};
	isLoading?: boolean;
};

export const StorageNewEditForm = ({ methods }: StorageNewEditFormProps) => {
	return (
		<FormProvider {...methods}>
			<form
				id="newStorageForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<>
					<div className="w-full flex gap-2">
						<div className="form-control w-1/2">
							<div className="label">
								<span className="label-text">IP *</span>
							</div>
							<Input
								id="ip"
								placeholder="IP"
								type="text"
								errormsg="Please fill in the IP"
								required
							/>
						</div>
					</div>
				</>
			</form>
		</FormProvider>
	);
};
