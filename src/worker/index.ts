import { Hono } from "hono";

import authRoutes from "./auth"
import sitemapRoutes from "./sitemap";

// import database and schema
import { drizzle } from 'drizzle-orm/d1';
import { sitemapEntries } from "./db/schema";
import { desc } from 'drizzle-orm'

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.route("/api/auth", authRoutes);
app.route("/api/", sitemapRoutes);

app.get('/sitemap.xml', async (c) => {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(sitemapEntries).orderBy(desc(sitemapEntries.lastmod));

    const urlsXml = result.map(entry => `
        <url>
            <loc>${entry.url}</loc>
            <lastmod>${entry.lastmod}</lastmod>
        </url>
    `).join("");

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlsXml}
        </urlset>`;

    return c.body(sitemapXml, 200, {
        'Content-Type': 'application/xml; charset=UTF-8',
    })
});

export default app;