import { Hono } from "hono";
import { basicAuth } from 'hono/basic-auth'
import { createMiddleware } from 'hono/factory'

export const isAdmin = createMiddleware<{ Bindings: Env }>(async (c, next) => {
  const admins = JSON.parse(c.env.ALLOWED_ADMIN) as string[];
  const passwords = JSON.parse(c.env.ALLOWED_PWD) as string[];
  const auth = basicAuth({
    verifyUser: (username, password) => {
      const idx = admins.indexOf(username);
      return idx !== -1 && passwords[idx] === password;
    },
  });
  return auth(c, next);
});

const authRoutes = new Hono<{ Bindings: Env }>();

authRoutes.get('/page', isAdmin, (c) => {
    return c.text('You are authorized')
})

export default authRoutes;