import type { UrlItemType } from "@/shared/types";
import { TableCell, TableRow } from "../components/ui/table";

export default function UrlItem({ id, url, lastmod, rowNumber }: UrlItemType & { rowNumber: number }) {
    return (
    <>
        <TableRow key={id}>
            <TableCell className="font-medium">{rowNumber}</TableCell>
            <TableCell>{url}</TableCell>
            <TableCell className="text-right">{lastmod}</TableCell>
        </TableRow>
    </>
    )
}