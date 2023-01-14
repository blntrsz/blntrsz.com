import { render, screen } from "@testing-library/react";
import { SearchSuggestion } from "../search-suggestion";
import * as reactQuery from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query";
import { TestIds } from "../test-ids.enum";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      page: "1",
    },
  }),
}));

describe("FavoriteButton", () => {
  it("should be loading", () => {
    jest.spyOn(reactQuery, "useQuery").mockReturnValueOnce({
      isLoading: true,
      data: {
        results: [{}],
      } as any,
    } as UseQueryResult<unknown, unknown>);
    render(
      <SearchSuggestion searchInput="asd" isSearchSuggestionOpen={true} />
    );

    expect(screen.getByTestId(TestIds.loading)).toBeTruthy();
  });

  it("should not be visible if searchInput is less than 3 characters", () => {
    jest.spyOn(reactQuery, "useQuery").mockReturnValueOnce({
      isLoading: true,
      data: {
        results: [{}],
      } as any,
    } as UseQueryResult<unknown, unknown>);
    render(<SearchSuggestion searchInput="as" isSearchSuggestionOpen={true} />);

    expect(screen.queryByTestId(TestIds.loading)).toBeNull();
  });

  it("should not be visible if isSearchSuggestionOpen is false", () => {
    jest.spyOn(reactQuery, "useQuery").mockReturnValueOnce({
      isLoading: true,
      data: {
        results: [{}],
      } as any,
    } as UseQueryResult<unknown, unknown>);
    render(
      <SearchSuggestion searchInput="asd" isSearchSuggestionOpen={false} />
    );

    expect(screen.queryByTestId(TestIds.loading)).toBeNull();
  });

  it("should render component if all requirement is met", () => {
    jest.spyOn(reactQuery, "useQuery").mockReturnValueOnce({
      isLoading: false,
      data: {
        results: [{ id: 1 }],
      } as any,
    } as UseQueryResult<unknown, unknown>);
    render(
      <SearchSuggestion searchInput="asd" isSearchSuggestionOpen={true} />
    );

    expect(screen.getByTestId(TestIds.component)).toBeTruthy();
  });
});
