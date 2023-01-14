import Router from "next/router";

export const pushPath = (query?: string, page?: number) => {
  Router.push({
    pathname: "",
    query: {
      ...(page && { page }),
      ...(query && { query }),
    },
  });
};
