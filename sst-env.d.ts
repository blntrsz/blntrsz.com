/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Blntrsz: {
      arn: string
      name: string
      type: "sst.aws.Bus"
    }
    Password: {
      type: "sst.sst.Secret"
      value: string
    }
    TursoDbUrl: {
      type: "sst.sst.Secret"
      value: string
    }
    TursoToken: {
      type: "sst.sst.Secret"
      value: string
    }
    User: {
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
