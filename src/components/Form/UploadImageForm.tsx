import { FormProvider, UseFormReturn } from "react-hook-form";
import { FileUpload } from "../Input/FileUpload";
import { DropEvent } from "react-dropzone";

type PartImportFormProps = {
	methods: UseFormReturn;
	onDrop: (files: File[], event: DropEvent) => void;
};
export const UploadImageForm = ({ methods, onDrop }: PartImportFormProps) => {
	const acceptedExtensions = { "image/png": [], "image/jpeg": [] };
	return (
		<FormProvider {...methods}>
			<form
				id="uploadImageForm"
				onSubmit={(e) => e.preventDefault()}
				noValidate
			>
				<div className="form-control w-full">
					<FileUpload
						id="imageUpload"
						accept={acceptedExtensions}
						onDrop={onDrop}
					/>
				</div>
			</form>
		</FormProvider>
	);
};
