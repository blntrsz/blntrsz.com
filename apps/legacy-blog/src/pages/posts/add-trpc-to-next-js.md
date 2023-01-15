---
setup: 'import Layout from ''../../layouts/BlogPost.astro''

  '
title: Add tRPC to Next.js
pubDate: 2022-06-02T22:00:00Z
tags:
- typescript
- trpc
- nextjs
description: Step by step guide on how to add tRPC to a Next.js project
github: https://github.com/blntrsz/hypebeast-stack

---
It's dependency time:

```bash
pnpm add @trpc/client @trpc/server @trpc/react @trpc/next zod react-query
```

Now, let's make the TypeScript checking stricter, as the tRPC documentation suggests:

```json
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true,
    "strictNullChecks": true
    // ...
  }
}
```

# Add the tRPC as an API route for Next.js:

```ts
// ./pages/api/trpc/[trpc].ts

import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

export const appRouter = trpc.router().query("hello", {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? "world"}`,
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
```

# Create tRPC hook:

```ts
// utils/trpc.ts

import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../pages/api/trpc/[trpc]";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
```

# Connect backend and frontend

```ts
// pages/_app.tsx
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "./api/trpc/[trpc]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
```

# Make API request:

```ts
// pages/index.ts

import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const hello = trpc.useQuery(["hello", { text: "client" }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}
```