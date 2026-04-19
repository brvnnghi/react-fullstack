import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppShell from "./routes/AppShell.tsx";

import "./index.css";
import Home from "./routes/Home.tsx";

// list and loader in 1 component
import UrlList, { loader as UrlLoader } from "./routes/UrlList.tsx";

// form and action in 2 components
import NewUrl from "./routes/NewUrl.tsx";
import { action as NewUrlAction } from "./routes/UrlForm.tsx";

// component tree
// AppShell
// ├── Sidebar Provider (UI)
// │   ├── AppSidebar (UI)
// │   ├── SidebarInset (UI)
// │   │   ├── Header (UI)
// │   │   ├── Main
// │   │   │   ├── Home (route)
// │   │   │   │   ├── Demo
// │   │   │   ├── UrlList (route, loader)
// │   │   │   │   ├── UrlItem
// │   │   │   │   ├── NewUrl (route, action)
// │   │   │   │   │   ├── Dialog (UI)
// │   │   │   │   │   │   ├── UrlForm

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppShell />, 
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/list",
				element: <UrlList />,
				loader: UrlLoader,
				children: [
					{
						path: "/list/new",
						element: <NewUrl />,
						action: NewUrlAction
					},
				]
			},

		] 
	}
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
