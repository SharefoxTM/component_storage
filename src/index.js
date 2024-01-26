import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./Routes";
import { Navbar } from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<Routes />

			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</QueryClientProvider>
	</React.StrictMode>,
);
