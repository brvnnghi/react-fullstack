import { Suspense } from "react";
import { Await, Link, Outlet, useLoaderData } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

import UrlItem from "./UrlItem";

import type { UrlItemType } from "../../shared/types";

function UrlList() {

	// loaderData is an object with a lazy promise (urls)
	const { urls } = useLoaderData<{ urls: Promise<UrlItemType[]> }>();

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
				<Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
					<Await resolve={urls}>
						{(loadedUrls: UrlItemType[]) =>
							loadedUrls.map((url) => (
								<UrlItem key={url.id} id={url.id} url={url.url} lastmod={url.lastmod} />
							))
						}
					</Await>
				</Suspense>
			</div>
		</>
	);
}

export default UrlList;

// V7 deferred pattern:
// The loader returns immediately with an object.
// urls is a bare promise (not awaited), so the router
// considers the loader "done" and mounts the route right away.
// <Await> + <Suspense> handle the pending state inside the component.
export async function loader() {
	return {
		urls: fetch("/api/urls")
			.then((response) => response.json())
			.then((data) => data.urls as UrlItemType[]),
	};
}

