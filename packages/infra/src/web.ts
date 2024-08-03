/// <reference path="../../../.sst/platform/config.d.ts" />

import { bus } from "./bus";
import { password, tursoDbUrl, tursoToken, user } from "./secret";

export const web = new sst.aws.Remix("Web", {
  buildCommand: "pnpm build",
  path: "packages/web",
  link: [tursoToken, tursoDbUrl, bus, user, password],
  permissions: [
    {
      actions: ["bedrock:InvokeModel"],
      resources: [
        "arn:aws:bedrock:eu-central-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
      ],
    },
  ],
  domain:
    $app.stage === "prod"
      ? {
          name: "blntrsz.com",
          dns: sst.aws.dns({
            zone: "Z098600234J46TZ3DMXE0",
          }),
        }
      : undefined,
});
