import { createCookieSessionStorage } from "@remix-run/node";

export const sessionCookie = createCookieSessionStorage<{ id: string }>({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secure: true,
  },
});
