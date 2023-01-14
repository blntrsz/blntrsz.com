import { transformQueryParam } from "./transform-query-param";

export const createPage = (page?: string | string[]) => {
  const pageQuery = parseInt(transformQueryParam(page));
  if (Number.isNaN(pageQuery) || pageQuery === 1) {
    return undefined;
  }

  return pageQuery;
};
