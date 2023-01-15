---
setup: import Layout from '../../layouts/BlogPost.astro'
title: My Stack
pubDate: 2022-05-31T22:00:00Z
tags:
- tailwindcss
- css
- typescript
- nextjs
- prisma
- trpc
description: Let's initialize an end-to-end typed full-stack TypeScript application.
github: https://github.com/blntrsz/my-stack

---
End-to-end typed full stack application starter. This let's you initialize a [TypeScript](https://www.typescriptlang.org/) project with [Next.js](https://nextjs.org/), [tRPC](https://trpc.io/), [Prisma](https://www.prisma.io/), [Tailwind CSS](https://tailwindcss.com/) and [PlanetScale](https://planetscale.com/), hosted on [Vercel](https://vercel.com/). Let's start with a Next.js part with TypeScript template:

```bash
pnpm create next-app -- --ts
```

We use pnpm as it is the superior package manager. Next, add Tailwind.

# Add Tailwind CSS

Utility classed rocks. Especially Tailwind CSS, so let's add it to our project:

[Add Tailwind CSS to Next.js](./add-tailwind-css-to-next-js)

# Add tRPC

It is the best thing since slice bread. It provides end-to-end type safety in TypeScript without compromise. If something changes in the backend, we get a type error on the frontend and vice versa.

[Add tRPC to Next.js](./add-trpc-to-next-js)

# Configure Prisma with PlanetScale

Prisma is the right abstraction for an ORM. It is and essential tool for SQL handling inside TypeScript.

[Configure Prisma and PlanetScale for Next.js](./configure-prisma-and-planetscape-for-next-js)

And we are ready to build the next unicorn!