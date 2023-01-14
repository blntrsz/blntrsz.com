import { THE_MOVIE_DB_URL } from "../constants/movie.constants";
import { GetAllMoviesResponse } from "../models/get-all-movies-response.model";

export const getAllMovies = async (query: string, page: number = 1) => {
  const response = await fetch(
    `${THE_MOVIE_DB_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&query=${query}&page=${page}`
  );
  return (await response.json()) as GetAllMoviesResponse;
};
