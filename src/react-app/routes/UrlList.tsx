import { Link, Outlet, useLoaderData } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

import UrlItem from "./UrlItem";

import type { UrlItemType } from "../../shared/types";

function UrlList() {

	// receiving loaderData from <UrlList> route
	// expecting an array of UrlItemType
	const urls = useLoaderData<UrlItemType[]>();

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
				{urls.map((url: UrlItemType ) => (
					<UrlItem key={url.id} id={url.id} url={url.url} lastmod={url.lastmod} />
				))}
			</div>
		</>
	);
}

export default UrlList;

// export loader function for <UrlList> route
export async function loader() {
	const response = await fetch("/api/urls");
	const data = await response.json();
	return data.urls;
}

