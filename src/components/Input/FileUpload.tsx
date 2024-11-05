import { Accept, DropEvent, useDropzone } from "react-dropzone";
import { Button } from "../Button";

type FileUploadProps = {
	id: string;
	accept: Accept;
	maxFiles?: number;
	noClick?: boolean;
	onDrop: (files: File[], event: DropEvent) => void;
};

export const FileUpload = ({
	id,
	accept,
	maxFiles = 1,
	noClick = false,
	onDrop,
}: FileUploadProps) => {
	const { getRootProps, getInputProps, open } = useDropzone({
		accept: accept,
		maxFiles: maxFiles,
		noClick: noClick,
		noKeyboard: noClick,
		onDropAccepted: onDrop,
	});
	return (
		<>
			<div {...getRootProps()}>
				{noClick && <Button onClick={open}>Upload file</Button>}
				{!noClick && <Button>Upload file</Button>}
				<input
					id={id}
					{...getInputProps()}
				/>
			</div>
		</>
	);
};
