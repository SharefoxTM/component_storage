import classNames from "classnames";

type ButtonProps = {
	size?: "sm" | "md" | "lg" | "xs" | "wide" | "block" | "responsive";
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
	glass?: boolean;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	id?: string;
	look?: "square" | "circle";
};

export const Button = ({
	size = "md", // This value is set when no other value is given
	variant = "primary",
	negative = false,
	glass = false,
	onClick,
	children,
	className,
	disabled,
	id,
	look,
}: ButtonProps) => {
	return (
		<button
			id={id}
			className={classNames(
				[
					"btn",
					[`btn-${variant}`],
					[variant === "primary" && `text-white`],
					[
						size === "responsive"
							? `btn-xs sm:btn-sm md:btn-md lg:btn-lg`
							: `btn-${size}`,
					],
					[negative ? "btn-outline" : ""],
					[glass ? "glass" : ""],
					[look ? `btn-${look}` : ""],
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
