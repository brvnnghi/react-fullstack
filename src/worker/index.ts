import { Hono } from "hono";

import type { UrlItemType } from "../shared/types";

const app = new Hono<{ Bindings: Env }>();

const sampleUrls: UrlItemType[] = [
    { id: "1", url: "https://example.com", lastmod: "2026-04-19T00:00:00Z" },
    { id: "2", url: "https://github.com", lastmod: "2026-04-18T12:00:00Z" },
    { id: "3", url: "https://cloudflare.com", lastmod: "2026-04-17T08:30:00Z" },
];

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));
app.get("/api/urls", async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return c.json({ urls: sampleUrls });
});

export default app;
