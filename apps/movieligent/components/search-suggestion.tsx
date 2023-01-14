import { createPage } from "../utils/create-page";
import { useGetAllMovies } from "../utils/use-get-all-movies.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef } from "react";
import { RotateLoader } from "react-spinners";
import { TestIds } from "./test-ids.enum";

interface SearchSuggestionProps {
  isSearchSuggestionOpen: boolean;
  searchInput?: string;
}

const SearchSuggestion = forwardRef(
  (
    { isSearchSuggestionOpen, searchInput = "" }: SearchSuggestionProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const router = useRouter();
    const page = createPage(router.query.page);
    const isSearchSuggestionEnabled = searchInput.length > 2;
    const { isLoading, data, error } = useGetAllMovies(
      searchInput,
      page,
      isSearchSuggestionEnabled
    );

    if (
      !isSearchSuggestionOpen ||
      !isSearchSuggestionEnabled ||
      !data?.results.length ||
      error
    ) {
      return <></>;
    }

    if (isLoading) {
      return (
        <div
          data-testid={TestIds.loading}
          className="absolute h-32 flex justify-center items-center rounded-b-lg bg-gray-700 w-full px-4"
        >
          <RotateLoader color="#ffffff" />
        </div>
      );
    }

    return (
      <div data-testid={TestIds.component} ref={ref} className="relative">
        <div className="absolute rounded-b-lg bg-gray-700 w-full px-4 py-1">
          <ul>
            {data?.results.map((suggestion) => (
              <li key={suggestion.id}>
                <Link href={`/${suggestion.id}`}>
                  <a className="text-slate-50 hover:text-slate-900">
                    {suggestion.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

SearchSuggestion.displayName = SearchSuggestion.name;
export { SearchSuggestion };
