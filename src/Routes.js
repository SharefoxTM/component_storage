import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Parts } from "./modules/Parts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello there!</div>,
	},
	{
		path: "/Parts",
		element: <Parts />,
	},
	{
		path: "/Parts/:categoryID/:categoryName",
		element: <Parts />,
	},
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
