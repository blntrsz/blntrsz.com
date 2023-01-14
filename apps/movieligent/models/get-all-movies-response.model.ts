import { Movie } from "../models/movie.model";

export interface GetAllMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
