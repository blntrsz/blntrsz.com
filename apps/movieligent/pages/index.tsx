import type { NextPage } from "next";
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { transformQueryParam } from "../utils/transform-query-param";
import { createPage } from "../utils/create-page";
import { FavoriteList } from "../components/favorite";
import { SearchSuggestion } from "../components/search-suggestion";
import { useGetAllMovies } from "../utils/use-get-all-movies.hook";
import { useOutsideClick } from "../utils/use-outside-click.hook";
import { pushPath } from "../utils/push-path";
import { MovieResults } from "../components/movie-results";

const Home: NextPage = () => {
  const router = useRouter();
  const page = createPage(router.query.page);
  const query = transformQueryParam(router.query.query);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchSuggestionOpen, setIsSearchSuggestionOpen] = useState(false);
  const { isLoading, error, data } = useGetAllMovies(query, page, !!query);
  const searchRef = useRef(null);
  const searchSuggestionRef = useRef(null);

  useOutsideClick([searchRef, searchSuggestionRef], () =>
    setIsSearchSuggestionOpen(false)
  );

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    if (
      router.query.page &&
      Number.isNaN(parseInt(transformQueryParam(router.query.page)))
    ) {
      pushPath(query, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page]);

  const search = () => {
    pushPath(searchInput, 1);
    setIsSearchSuggestionOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <div className="m-8 flex">
        <div className="w-full">
          <input
            ref={searchRef}
            autoComplete="off"
            onFocus={() => setIsSearchSuggestionOpen(true)}
            defaultValue={searchInput}
            onKeyDown={handleKeyDown}
            onChange={({ currentTarget: { value } }) => setSearchInput(value)}
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for movies..."
            required
          />
          <SearchSuggestion
            ref={searchSuggestionRef}
            searchInput={searchInput}
            isSearchSuggestionOpen={isSearchSuggestionOpen}
          />
        </div>
        <button
          onClick={search}
          disabled={!searchInput}
          className="ml-8 text-stone-50 bg-blue-400 px-4 py-2 rounded-lg disabled:bg-slate-400"
        >
          Search
        </button>
      </div>
      <FavoriteList />
      {query && (
        <MovieResults isLoading={isLoading} error={error} data={data} />
      )}
    </>
  );
};

export default Home;
