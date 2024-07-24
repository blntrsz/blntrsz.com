/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    TursoDbUrl: {
      type: "sst.sst.Secret"
      value: string
    }
    TursoToken: {
      type: "sst.sst.Secret"
      value: string
    }
    Web: {
      type: "sst.aws.Remix"
      url: string
    }
  }
}
export {}
