import { Hono } from "hono";

import authRoutes from "./auth"
import sitemapRoutes from "./sitemap";

const app = new Hono<{ Bindings: Env }>();

app.route("/api/auth", authRoutes);
app.route("/api/", sitemapRoutes);

export default app;
