import { Hono } from "hono";

// import database and schema
import { drizzle } from 'drizzle-orm/d1';
import { sitemapEntries } from "./db/schema";
import { desc } from 'drizzle-orm'

// import middleware
import { isAdmin } from "./auth";

// import types
import type { UrlItemType, CreateUrlItemType } from "../shared/types";

const sitemapRoutes = new Hono<{ Bindings: Env }>();

sitemapRoutes.get("/", (c) => c.json({ name: "Cloudflare" }));

sitemapRoutes.get("/urls", async (c) => {
    // query all url items from the database
    const db = drizzle(c.env.DB);
    const result = await db.select().from(sitemapEntries).orderBy(desc(sitemapEntries.lastmod));
    return c.json({ urls: result });
});

sitemapRoutes.post("/urls", isAdmin, async (c) => {
    const body = await c.req.json<CreateUrlItemType>();

    // prepare, validate, and sanitize the new url item
    const newUrl: UrlItemType = {
        id: crypto.randomUUID(),
        url: body.url,
        lastmod: body.lastmod || new Date().toISOString().split("T")[0]
    };

    // insert into database
    const db = drizzle(c.env.DB);
    await db.insert(sitemapEntries).values(newUrl);

    // return the newly created url item
    return c.json({ url: newUrl });
});

export default sitemapRoutes;