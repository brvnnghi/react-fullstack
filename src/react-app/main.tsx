import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppShell from "./routes/AppShell.tsx";

import "./index.css";
import Home from "./routes/Home.tsx";
import NewUrl from "./routes/NewUrl.tsx";

// component tree
// AppShell
// ├── Home
// │   ├── Demo
// │   ├── Button
// │   ├── Modal
// │   │   └── NewUrl
// │   └── UrlList

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppShell />, 
		children: [
			{
				path: "/",
				element: <Home />,
				children: [
					{
						path: "/new",
						element: <NewUrl />,
					},
				]
			}
		] 
	}
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
