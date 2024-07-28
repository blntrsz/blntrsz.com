/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "blntrsz-com",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-central-1",
        },
      },
    };
  },
  console: {
    autodeploy: {
      target(event) {
        if (
          event.type === "branch" &&
          event.branch === "prod" &&
          event.action === "pushed"
        ) {
          return {
            stage: "prod",
            runner: { engine: "codebuild", compute: "small" },
          };
        }
      },
    },
  },
  async run() {
    import("./packages/infra/src");
  },
});
