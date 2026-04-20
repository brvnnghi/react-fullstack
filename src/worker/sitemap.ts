import { Hono } from "hono";

import type { UrlItemType, CreateUrlItemType } from "../shared/types";
import { isAdmin } from "./auth";

const sitemapRoutes = new Hono<{ Bindings: Env }>();

const sampleUrls: UrlItemType[] = [
    { id: "1", url: "https://www.brandsvietnam.com", lastmod: "2026-04-19" },
    { id: "2", url: "https://www.hires.vn", lastmod: "2026-04-18" },
    { id: "3", url: "https://www.brandcamp.asia", lastmod: "2026-04-17" },
    { id: "4", url: "https://www.agencyvietnam.com", lastmod: "2026-04-16" },
    { id: "5", url: "https://www.guitoi.com", lastmod: "2026-04-15" },
    { id: "6", url: "https://www.youhoc.com", lastmod: "2026-04-14" },
    { id: "7", url: "https://www.draftcut.app", lastmod: "2026-04-13" },
    { id: "8", url: "https://www.brand.camp", lastmod: "2026-04-12" }
];

sitemapRoutes.get("/", (c) => c.json({ name: "Cloudflare" }));

sitemapRoutes.get("/urls", async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return c.json({ urls: sampleUrls });
});

sitemapRoutes.post("/urls", isAdmin, async (c) => {
    const body = await c.req.json<CreateUrlItemType>();
    const newUrl: UrlItemType = {
        id: String(sampleUrls.length + 1),
        url: body.url,
        lastmod: body.lastmod || new Date().toISOString().split("T")[0]
    };
    sampleUrls.push(newUrl);
    return c.json({ url: newUrl });
});

export default sitemapRoutes;