/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "blntrsz-com",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-central-1",
        },
      },
    };
  },
  async run() {
    import("./packages/infra/src");
  },
});
