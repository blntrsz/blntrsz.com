import { Context } from "./context";

const RequestContext = Context.create<{
  requestId: string;
}>("RequestContext");

export const withRequestContext = RequestContext.with;
export const useRequestContext = RequestContext.use;
