import { IMAGE_PREFIX, NO_IMAGE_PREFIX } from "../constants/movie.constants";
import { GetAllMoviesResponse } from "../models/get-all-movies-response.model";
import { createPage } from "../utils/create-page";
import { pushPath } from "../utils/push-path";
import { transformQueryParam } from "../utils/transform-query-param";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RotateLoader } from "react-spinners";
import { TestIds } from "./test-ids.enum";

interface MovieResultsProps {
  isLoading: boolean;
  error: unknown;
  data?: GetAllMoviesResponse;
}

export const MovieResults = ({ isLoading, error, data }: MovieResultsProps) => {
  const router = useRouter();
  const query = transformQueryParam(router.query.query);
  const page = createPage(router.query.page);
  const totalPages = data?.total_pages;

  useEffect(() => {
    if ((totalPages && totalPages < (page ?? 1)) || page === 0) {
      pushPath(query, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, page]);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <RotateLoader color="#ffffff" />
      </div>
    );
  }

  if (error || !data?.results) {
    return <div>Error</div>;
  }

  return (
    <>
      <ul className="mx-4">
        {data.results.map((movie) => (
          <li
            data-testid={TestIds.movieResult}
            key={movie.id}
            className="rounded-lg h-full bg-slate-400 m-4"
          >
            <Link href={`/${movie.id}`}>
              <a className="flex">
                <div>
                  <div className="w-24 h-full rounded-l-lg">
                    {!!movie.poster_path ? (
                      <Image
                        alt={movie.title}
                        className="rounded-l-lg h-full"
                        src={`${IMAGE_PREFIX}${movie.poster_path}`}
                      />
                    ) : (
                      <div className="h-36 w-24 bg-slate-500 rounded-l-lg justify-center items-center flex">
                        <Image
                          alt="No image"
                          className="w-16 h-full"
                          src={NO_IMAGE_PREFIX}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-lg font-bold">{movie.original_title}</h1>
                  <p className="max-w-6xl">{movie.release_date}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      {!!data.results.length && (
        <ul className="flex justify-center m-4">
          <li>
            <Link
              href={{
                pathname: "",
                query: {
                  page: page ? page - 1 : 1,
                  ...(query && { query }),
                },
              }}
            >
              <a
                className={`text-stone-50 px-4 py-2 rounded-lg m-4 ${
                  page === undefined
                    ? "pointer-events-none bg-slate-400"
                    : "bg-blue-400"
                }`}
              >
                Previous
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "",
                query: {
                  page: page ? page + 1 : 2,
                  ...(query && { query }),
                },
              }}
            >
              <a
                className={`text-stone-50 px-4 py-2 rounded-lg m-4 ${
                  (page ?? 1) === totalPages
                    ? "pointer-events-none bg-slate-400"
                    : "bg-blue-400"
                }`}
              >
                Next
              </a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};
