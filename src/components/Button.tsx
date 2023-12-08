import classNames from "classnames";

type ButtonProps = {
	size?: "sm" | "md" | "lg" | "flex";
	variant?:
		| "primary"
		| "secondary"
		| "neutral"
		| "accent"
		| "ghost"
		| "link"
		| "info"
		| "success"
		| "warning"
		| "error";
	negative?: boolean;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
};

export const Button = ({
	size = "md", // This value is set when no other value is given
	variant = "primary",
	negative = false,
	onClick,
	children,
	className,
	disabled,
}: ButtonProps) => {
	return (
		<button
			className={classNames(
				[
					"btn",
					[`btn-${variant}${negative ? "-negative" : ""}`],
					[`btn-${size}`],
				],
				className,
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
