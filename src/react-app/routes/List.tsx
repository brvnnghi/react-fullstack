import { Link, Outlet } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

function UrlList() {

	return (
		<>
			<p>Sitemap List</p>
			<Link
				to="/list/new"
				className={buttonVariants({ variant: "default" })}
			>
				<Plus className="size-4" />
				<span>New Url</span>
			</Link>
			<Outlet />
		</>
	);
}

export default UrlList;