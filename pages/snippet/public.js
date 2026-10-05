import useSWR from "swr";
import SearchBar from "@/components/features/SearchBar/SearchBar";
import FilterSnippetList from "@/components/features/FilterSnippetList/FilterSnippetList";
import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import useSearchMatch from "@/hooks/useSearchMatch/useSearchMatch";
import filterSnippets from "@/lib/filter/filterSnippets";

export default function PublicPage({
  search,
  onSearch,
  activeFilterItems,
  onActiveFilterItems,
}) {
  const { data: snippets, error, isLoading } = useSWR("/api/snippets/public");
  console.log("publicSnippets:", snippets);

  const filteredSnippets = filterSnippets(snippets ?? [], activeFilterItems);
  const { searchedSnippets } = useSearchMatch(filteredSnippets, search);

  if (isLoading) {
    return <p className="p-4 text-gray-500">Just a second. Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="font-semibold">
          Oops! Something did not go as planned...
        </p>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  const hasSearch = search && search.trim() !== "";
  const hasActiveFilter =
    activeFilterItems.languages.length > 0 ||
    activeFilterItems.tags.length > 0 ||
    activeFilterItems.years.length > 0;

  const showNoSnippets = !snippets || snippets.length === 0;
  const showNoFilterResults =
    !showNoSnippets && hasActiveFilter && filteredSnippets.length === 0;
  const showNoSearchResults =
    !showNoSnippets &&
    hasSearch &&
    filteredSnippets.length > 0 &&
    searchedSnippets.length === 0;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Public Snippets</h1>
      </header>

      <main>
        <section className="flex flex-col mb-4 gap-2">
          <SearchBar onSearch={onSearch} search={search} />
          <FilterSnippetList
            activeFilterItems={activeFilterItems}
            onActiveFilterItems={onActiveFilterItems}
            snippets={snippets ?? []}
          />
        </section>

        {showNoSnippets ? (
          <p className="text-gray-500">There are no public snippets yet.</p>
        ) : null}

        {showNoFilterResults ? (
          <p className="p-4 text-gray-500">
            No snippets match the selected filters. Try changing or clearing
            them.
          </p>
        ) : null}

        {showNoSearchResults ? (
          <p className="p-4 text-gray-500">
            No snippets found with this search term. Please try something else.
          </p>
        ) : null}

        <SnippetsList snippets={searchedSnippets} />
      </main>
    </div>
  );
}
