import {
	createBrowserRouter,
	isRouteErrorResponse,
	RouterProvider,
	useRouteError,
} from "react-router-dom";
import { Parts } from "./modules/Parts";
import { PartView } from "./modules/PartView";

export const ErrorFallback = () => {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<div className="flex flex-col flex-shrink-0 justify-center mt-16">
					<div className="basis-full content-center text-5xl text-center text-white">
						<h1>{error.status}: This page doesn't exist!</h1>
					</div>
				</div>
			);
		}

		if (error.status === 401) {
			return (
				<div className="flex flex-col flex-shrink-0 justify-center mt-16">
					<div className="basis-full content-center text-5xl text-center text-white">
						<h1>{error.status}: You aren't authorized to see this</h1>
					</div>
				</div>
			);
		}

		if (error.status === 503) {
			return (
				<div className="flex flex-col flex-shrink-0 justify-center mt-16">
					<div className="basis-full content-center text-5xl text-center text-white">
						<h1>{error.status}: Looks like our API is down</h1>
					</div>
				</div>
			);
		}

		if (error.status === 418) {
			return (
				<div className="flex flex-col flex-shrink-0 justify-center mt-16">
					<div className="basis-full content-center text-5xl text-center">
						<h1>🫖</h1>
					</div>
				</div>
			);
		}
	}

	return (
		<div className="flex flex-col flex-shrink-0 justify-center mt-16">
			<div className="basis-full content-center text-5xl text-center text-white">
				<h1>Something went wrong</h1>
			</div>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello there!</div>,
		errorElement: <ErrorFallback />,
	},
	{
		path: "/Parts",
		element: <Parts />,
		errorElement: <ErrorFallback />,
	},
	{
		path: "/Parts/:categoryID/:categoryName",
		element: <Parts />,
		errorElement: <ErrorFallback />,
	},
	{
		path: "/Part/:partID",
		element: <PartView />,
	},
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
