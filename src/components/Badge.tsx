import classNames from "classnames";

type BadgeProps = {
	size?: "xs" | "sm" | "md" | "lg";
	variant?:
		| "neutral"
		| "primary"
		| "secondary"
		| "accent"
		| "ghost"
		| "info"
		| "success"
		| "warning"
		| "error";
	children: React.ReactNode;
	className?: string;
};

export const Badge = ({
	size = "md",
	variant,
	children,
	className,
}: BadgeProps) => {
	return (
		<>
			<div
				className={classNames(
					"badge",
					[variant ? `badge-${variant}` : ""],
					`badge-${size}`,
					className,
				)}
			>
				{children}
			</div>
		</>
	);
};
