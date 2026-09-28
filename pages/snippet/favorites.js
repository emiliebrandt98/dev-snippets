import SearchBar from "@/components/features/SearchBar/SearchBar";
import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import DeleteButton from "@/components/ui/DeleteButton/DeleteButton";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";
import useFavorite from "@/hooks/useFavorite/useFavorite";
import useSearchMatch from "@/hooks/useSearchMatch/useSearchMatch";
import useSnippetSelection from "@/hooks/useSnippetSelection/useSnippetSelection";

export default function FavoritesPage({
  snippets,
  isLoading,
  error,
  onSearch,
  search,
}) {
  const { favoriteIds } = useFavorite();
  const {
    isDeleteMode,
    selectedIds,
    onToggleDeleteMode,
    setIsModalOpen,
    onSelectSnippet,
    onDeleteConfirmed,
    isModalOpen,
    isDeleting,
    selectedSnippets,
  } = useSnippetSelection(snippets);

  const favoriteSnippets = (snippets ?? []).filter((snippet) =>
    favoriteIds.includes(snippet._id)
  );

  const { searchedSnippets } = useSearchMatch(favoriteSnippets, search);

  console.log("favoriteIds:", favoriteIds);
  console.log("favoriteSnippets:", favoriteSnippets);
  console.log("searchedSnippets:", searchedSnippets);

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>

      <main>
        <section className="flex flex-row items-center gap-2 mb-4">
          <div className="flex-1">
            <SearchBar onSearch={onSearch} search={search} />
          </div>
          <DeleteButton
            isDeleteMode={isDeleteMode}
            onToggleDeleteMode={onToggleDeleteMode}
            selectedIds={selectedIds}
            setIsModalOpen={setIsModalOpen}
          />
        </section>

        {favoriteSnippets.length === 0 ? (
          <p className="p-4 textgray-500">
            There is no favorite snippets. Mark snippets as favorite to view
            them here.
          </p>
        ) : null}

        {searchedSnippets.length === 0 ? (
          <p className="p-4 textgray-500">
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
          selectedSnippets={selectedSnippets}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
