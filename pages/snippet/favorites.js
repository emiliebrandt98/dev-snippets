import FilterSnippetList from "@/components/features/FilterSnippetList/FilterSnippetList";
import SearchBar from "@/components/features/SearchBar/SearchBar";
import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import FilterButton from "@/components/ui/FilterButton/FilterButton";
import useFilterOptions from "@/hooks/useFilterOptions/useFilterOptions";
import useSearchMatch from "@/hooks/useSearchMatch/useSearchMatch";
import filterSnippets from "@/lib/filter/filterSnippets";

export default function FavoritesPage({
  snippets,
  favoriteSnippets = [],
  isLoading,
  error,
  onSearch,
  search,
  activeFilterItems,
  onActiveFilterItems,
}) {
  const filteredSnippets = filterSnippets(favoriteSnippets, activeFilterItems);

  const { searchedSnippets } = useSearchMatch(filteredSnippets, search);

  const {
    languageItems,
    tagItems,
    yearItems,
    isLoadingLanguages,
    isLoadingTags,
    errorLanguages,
    errorTags,
    openFilter,
    onOpenFilter,
    draftFilterItems,
    ondraftFilterItems,
    onHandleOpenFilter,
    activeFilterCount,
    onClearFilter,
  } = useFilterOptions(
    favoriteSnippets,
    activeFilterItems,
    onActiveFilterItems,
    true
  );

  if (isLoading) {
    return <p className="p-4 text-gray-500">Just a second. Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="font-semibold">Oops! Someting did not go as planned...</p>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  const hasSearch = search && search.trim() !== "";

  const hasActiveFilter =
    activeFilterItems.languages.length > 0 ||
    activeFilterItems.tags.length > 0 ||
    activeFilterItems.years.length > 0;

  const showNoSnippets = !favoriteSnippets || favoriteSnippets.length === 0;

  const showNoFilterResults =
    !showNoSnippets && hasActiveFilter && filteredSnippets.length === 0;

  const showNoSearchResults =
    !showNoSnippets &&
    hasSearch &&
    filteredSnippets.length > 0 &&
    searchedSnippets.length === 0;

  return (
    <div className="max-w-2xl lg:max-w-none mx-auto p-4">
      <header className="mb-6">
        <h1 className="lg:hidden text-2xl font-bold">FavoriteSnippets</h1>
      </header>

      <main>
        <section className="flex flex-col mb-4 gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="flex-1">
              <SearchBar onSearch={onSearch} search={search} />
            </div>
            <FilterButton
              activeFilterCount={activeFilterCount}
              onClearFilter={onClearFilter}
              onHandleOpenFilter={onHandleOpenFilter}
            />
          </div>

          <FilterSnippetList
            activeFilterItems={activeFilterItems}
            onActiveFilterItems={onActiveFilterItems}
            openFilter={openFilter}
            onOpenFilter={onOpenFilter}
            draftFilterItems={draftFilterItems}
            ondraftFilterItems={ondraftFilterItems}
            languageItems={languageItems}
            tagItems={tagItems}
            yearItems={yearItems}
            isLoadingLanguages={isLoadingLanguages}
            isLoadingTags={isLoadingTags}
            errorLanguages={errorLanguages}
            errorTags={errorTags}

            snippets={snippets}
          />
        </section>

        {showNoSnippets ? (
          <p className="text-gray-500">
            There is no favorite snippets. Mark snippets as favorite to view
            them here.
          </p>
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
