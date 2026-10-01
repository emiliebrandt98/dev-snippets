import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";
import useSnippetSelection from "@/hooks/useSnippetSelection/useSnippetSelection";
import DeleteButton from "@/components/ui/DeleteButton/DeleteButton";
import SearchBar from "@/components/features/SearchBar/SearchBar";
import useSearchMatch from "@/hooks/useSearchMatch/useSearchMatch";
import FilterSnippetList from "@/components/features/FilterSnippetList/FilterSnippetList";
import filterSnippets from "@/lib/filter/filterSnippets";

export default function Home({
  snippets,
  isLoading,
  error,
  onSearch,
  search,
  activeFilterItems,
  onActiveFilterItems,
}) {
  const {
    isDeleteMode,
    onToggleDeleteMode,
    selectedIds,
    setIsModalOpen,
    onSelectSnippet,
    onDeleteConfirmed,
    isModalOpen,
    isDeleting,
    selectedSnippets,
  } = useSnippetSelection(snippets);

  const filteredSnippets = filterSnippets(snippets ?? [], activeFilterItems);
  const { searchedSnippets } = useSearchMatch(filteredSnippets, search);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

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
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>

      <main>
        <section className="flex flex-col mb-4 gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="flex-1">
              <SearchBar onSearch={onSearch} search={search} />
            </div>
            <DeleteButton
              isDeleteMode={isDeleteMode}
              onToggleDeleteMode={onToggleDeleteMode}
              selectedIds={selectedIds}
              setIsModalOpen={setIsModalOpen}
            />
          </div>

          <FilterSnippetList
            activeFilterItems={activeFilterItems}
            onActiveFilterItems={onActiveFilterItems}
            snippets={snippets}
          />
        </section>

        {showNoSnippets ? (
          <>
            <p className="font-semibold">
              No snippets found. Create snippets to display them in a list.
            </p>
            <p className="text-gray-500">{`You can create snippets with the "+" button.`}</p>
          </>
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

        <SnippetsList
          snippets={searchedSnippets}
          isDeleteMode={isDeleteMode}
          selectedIds={selectedIds}
          onSelectSnippet={onSelectSnippet}
        />
      </main>

      {isModalOpen && (
        <DeleteConfirmationModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={onDeleteConfirmed}
          isDeleting={isDeleting}
          title="Delete Snippets"
        >
          <p>You are about to delete the following snippets:</p>
          <ul className="list-disc pl-5 mt-2">
            {selectedSnippets.map((snippet) => (
              <li key={snippet._id}>{snippet.title}</li>
            ))}
          </ul>
        </DeleteConfirmationModal>
      )}
    </div>
  );
}
