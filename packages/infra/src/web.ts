/// <reference path="../../../.sst/platform/config.d.ts" />

import { bus } from "./bus";
import { tursoDbUrl, tursoToken } from "./secret";

export const web = new sst.aws.Remix("Web", {
  buildCommand: "pnpm build",
  path: "packages/web",
  link: [tursoToken, tursoDbUrl, bus],
});
