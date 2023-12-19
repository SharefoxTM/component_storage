type ModalProps = {
	id: string;
	title: string;
	children?: React.ReactNode;
};

export const Modal = ({ id, title, children }: ModalProps) => {
	return (
		<dialog
			id={id}
			className="modal"
		>
			<div className="modal-box overflow-visible">
				<h3 className="font-bold text-lg">{title}</h3>
				{children}
			</div>
		</dialog>
	);
};
