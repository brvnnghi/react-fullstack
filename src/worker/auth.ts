import { Hono } from "hono";
import { getSignedCookie, setSignedCookie, deleteCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import type { UserType } from "../shared/types";

const COOKIE_NAME = "session";

export const isAdmin = createMiddleware<{ Bindings: Env }>(async (c, next) => {
  const username = await getSignedCookie(c, c.env.COOKIE_SECRET, COOKIE_NAME);
  if (!username) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});

const authRoutes = new Hono<{ Bindings: Env }>();

authRoutes.post("/login", async (c) => {
  const { username, password } = await c.req.json<UserType>();
  const admins = JSON.parse(c.env.ALLOWED_ADMIN);
  const passwords = JSON.parse(c.env.ALLOWED_PWD);

  // check if username exists and password matches
  const idx = admins.indexOf(username);
  if (idx === -1 || passwords[idx] !== password) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // set signed cookie
  await setSignedCookie(c, COOKIE_NAME, username, c.env.COOKIE_SECRET, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return c.json({ username });
});

authRoutes.post("/logout", async (c) => {
  deleteCookie(c, COOKIE_NAME, { path: "/" });
  return c.json({ ok: true });
});

authRoutes.get("/me", isAdmin, async (c) => {
  const username = await getSignedCookie(c, c.env.COOKIE_SECRET, COOKIE_NAME);
  return c.json({ username });
});

export default authRoutes;