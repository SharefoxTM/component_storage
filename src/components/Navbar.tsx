import classNames from "classnames";

type NavButtonProps = {
	children: React.ReactNode;
	className?: string;
	href?: string;
};

const NavButton = ({ children, className, href }: NavButtonProps) => {
	return (
		<a
			className={classNames("btn btn-ghost normal-case", className)}
			href={href}
		>
			{children}
		</a>
	);
};

export const Navbar = () => {
	return (
		<div className="navbar bg-base-300 flex align-baseline w-full">
			<NavButton
				className="text-xl"
				href="/"
			>
				Home
			</NavButton>
			<NavButton href="/parts">Parts</NavButton>
			<NavButton href="/PO">Add PO</NavButton>
			<NavButton href="/SO">Add SO</NavButton>
			<NavButton
				href="/storage"
				className="justify-end ml-auto"
			>
				Storage
			</NavButton>
		</div>
	);
};
