import { Separator } from "@/components/ui/separator";

import type { UrlItemType } from "@/shared/types";

export default function UrlItem({ id, url, lastmod }: UrlItemType) {

    return (
    <>
        <dl className="flex items-center justify-between">
            <dt id={id}>{url}</dt>
            <dd className="text-muted-foreground">{lastmod}</dd>
        </dl>
        <Separator />
    </>
    )
}