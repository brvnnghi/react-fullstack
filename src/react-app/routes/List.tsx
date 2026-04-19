import { Link, Outlet } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

import UrlItem from "./UrlItem";

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
			<div className="flex w-full max-w-sm flex-col gap-2 text-sm">
				<UrlItem id="1" url="https://example.com" lastmod="2024-06-01" />
				<UrlItem id="2" url="https://example2.com" lastmod="2024-06-02" />
			</div>
		</>
	);
}

export default UrlList;