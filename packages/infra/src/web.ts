/// <reference path="../../../.sst/platform/config.d.ts" />

import { bus } from "./bus";
import { password, tursoDbUrl, tursoToken, user } from "./secret";

export const web = new sst.aws.Remix("Web", {
  buildCommand: "pnpm build",
  path: "packages/web",
  link: [tursoToken, tursoDbUrl, bus, user, password],
  domain:
    $app.stage === "prod"
      ? {
          name: "blntrsz.com",
          dns: sst.aws.dns({
            zone: "Z06874309HH4OHAYVP8B",
          }),
        }
      : undefined,
});
