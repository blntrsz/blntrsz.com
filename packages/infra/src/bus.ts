export const bus = new sst.aws.Bus("Blntrsz");

bus.subscribe("packages/infra/src/functions/event-handler.handler");
