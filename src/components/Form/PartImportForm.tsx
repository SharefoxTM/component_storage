import { DropEvent } from "react-dropzone";
import { FileUpload } from "../Input/FileUpload";

type PartImportFormProps = {
	onDrop: (files: File[], event: DropEvent) => void;
};

export const PartImportForm = ({ onDrop }: PartImportFormProps) => {
	const acceptedExtensions = {
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
			".xlsx",
			".xls",
		],
	};
	return (
		<form
			id="partImportForm"
			onSubmit={(e) => e.preventDefault()}
			noValidate
		>
			<div className="form-control w-full">
				<div className="label">
					<span className="label-text">Import file</span>
				</div>
				<FileUpload
					id="partImport"
					accept={acceptedExtensions}
					onDrop={onDrop}
				/>
			</div>
		</form>
	);
};
