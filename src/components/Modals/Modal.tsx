import { Button, ButtonVariants } from "../Button";
import { Checkbox } from "../Input/Checkbox";

type ModalProps = {
	id: string;
	title: string;
	children?: React.ReactNode;
	submitTitle?: string;
	submitVariant?: ButtonVariants;
	onSubmit?: () => void;
	onCancel?: () => void;
	checkboxLabel?: string;
	checkboxSetter?: (value: boolean) => void;
	checkboxState?: boolean;
};

export const Modal = ({
	id,
	title,
	children,
	submitTitle,
	submitVariant = "success",
	onSubmit,
	onCancel,
	checkboxLabel,
	checkboxSetter,
	checkboxState,
}: ModalProps) => {
	const hasSubmit = submitTitle !== undefined;
	const hasCheckbox =
		checkboxLabel !== undefined &&
		checkboxSetter !== undefined &&
		checkboxState !== undefined;
	return (
		<dialog
			id={id}
			className="modal"
		>
			<div className="modal-box overflow-visible">
				<h3 className="font-bold text-lg">{title}</h3>
				<form method="dialog">
					<Button
						size="sm"
						variant="ghost"
						className="btn-circle absolute right-2 top-2"
					>
						✕
					</Button>
				</form>
				{children}
				<div className="modal-action">
					{(hasCheckbox && (
						<div className="flex flex-row gap-2 w-full items-end">
							<>
								<div className="flex flex-col">
									<Checkbox
										handleChange={(event) =>
											checkboxSetter(event.target.checked)
										}
										id="continueItems"
										label={checkboxLabel}
										checked={checkboxState}
									/>
								</div>
								<div className="flex-grow"></div>
								{hasSubmit && (
									<Button
										variant={submitVariant}
										onClick={onSubmit}
									>
										{submitTitle}
									</Button>
								)}
								<form method="dialog">
									{(onCancel !== undefined && (
										<Button onClick={onCancel}>Cancel</Button>
									)) || <Button>Cancel</Button>}
								</form>
							</>
						</div>
					)) || (
						<>
							{hasSubmit && (
								<Button
									variant={submitVariant}
									onClick={onSubmit}
								>
									{submitTitle}
								</Button>
							)}
							<form method="dialog">
								{(onCancel !== undefined && (
									<Button onClick={onCancel}>Cancel</Button>
								)) || <Button>Cancel</Button>}
							</form>
						</>
					)}
				</div>
			</div>
		</dialog>
	);
};
