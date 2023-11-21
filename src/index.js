import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./Routes";
import { Navbar } from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<Routes />
		</QueryClientProvider>
	</React.StrictMode>,
);
