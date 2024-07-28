import { tursoDbUrl, tursoToken } from "./secret";

export const bus = new sst.aws.Bus("Blntrsz");

bus.subscribe({
  handler: "packages/infra/src/functions/event-handler.handler",
  link: [tursoDbUrl, tursoToken],
});
