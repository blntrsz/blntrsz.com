import {
  IMAGE_PREFIX,
  NO_IMAGE_PREFIX,
  THE_MOVIE_DB_URL,
} from "../constants/movie.constants";
import { Movie } from "../models/movie.model";
import { FavoriteButton, FavoriteList } from "../components/favorite";
import { transformQueryParam } from "../utils/transform-query-param";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import RotateLoader from "react-spinners/RotateLoader";

const getMovie = async (id: string) => {
  const response = await fetch(
    `${THE_MOVIE_DB_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
  );
  return (await response.json()) as Movie;
};

const MoviePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useQuery(
    ["getMovie", id],
    () => getMovie(transformQueryParam(id)),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <RotateLoader color="#ffffff" />
      </div>
    );
  }

  if (error || !data) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="m-8">
        <FavoriteList />
      </div>
      <div className="rounded-lg bg-slate-600 m-16 p-16 lg:flex">
        <div>
          {!!data.poster_path ? (
            <Image
              alt={data.title}
              className="h-32 w-24 rounded-lg"
              src={`${IMAGE_PREFIX}${data.poster_path}`}
            />
          ) : (
            <div className="h-32 w-24 bg-slate-500 rounded-lg justify-center items-center flex">
              <Image alt="No image" className="w-16" src={NO_IMAGE_PREFIX} />
            </div>
          )}
        </div>
        <div className="lg:ml-8">
          <h1 className="text-xl text-slate-50">{data?.title}</h1>
          <p className="max-w-6xl text-slate-50">{data.overview}</p>
          <p className="max-w-6xl text-slate-400">{data.release_date}</p>
          <FavoriteButton
            id={data.id}
            poster_path={data.poster_path}
            title={data.title}
          />
        </div>
      </div>
    </>
  );
};

export default MoviePage;
