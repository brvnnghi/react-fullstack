import { Suspense } from "react";
import { Await, Link, Outlet, useLoaderData } from "react-router-dom";

import { buttonVariants } from "@/react-app/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/react-app/components/ui/table"

// import auth hook
import { useAuth } from "@/react-app/lib/auth"

import UrlItem from "./UrlItem";

import type { UrlItemType } from "../../shared/types";

function UrlList() {

	// if logged in, show New Url button
	const { username } = useAuth()

	// loaderData is an object with a lazy promise (urls)
	const { urls } = useLoaderData<{ urls: Promise<UrlItemType[]> }>();

	return (
		<>
			<h2 className="text-lg font-semibold">URL List</h2>
			{username && (
				<Link
					to="/list/new"
					className={`${buttonVariants({ variant: "default" })} w-fit`}
				>
					<Plus className="size-4" />
					<span>New Url</span>
				</Link>
			)}
			<Outlet />
			<div className="rounded-xl bg-white p-3">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">STT</TableHead>
							<TableHead>URL</TableHead>
							<TableHead className="text-right">Last Modified</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<Suspense
							fallback={
								<TableRow>
									<TableCell colSpan={3} className="text-center text-muted-foreground">
										Loading...
									</TableCell>
								</TableRow>
							}
						>
							<Await resolve={urls}>
								{(loadedUrls: UrlItemType[]) =>
									loadedUrls.map((url, index) => (
										<UrlItem
											key={url.id}
											id={url.id}
											url={url.url}
											lastmod={url.lastmod}
											rowNumber={index + 1}
										/>
									))
								}
							</Await>
						</Suspense>
					</TableBody>
				</Table>
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

