import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "./get-all-movies";

export const useGetAllMovies = (
  query: string,
  page?: number,
  enabled: boolean = true
) => {
  return useQuery(
    ["getAllMovies", query, page],
    () => getAllMovies(query, page),
    {
      enabled,
    }
  );
};
