import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import DeleteButton from "@/components/ui/DeleteButton/DeleteButton";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";
import useFavorite from "@/hooks/useFavorite/useFavorite";
import useSnippetSelection from "@/hooks/useSnippetSelection/useSnippetSelection";

export default function FavoritesPage({ snippets, isLoading, error }) {
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
  const favoriteSnippets =
    snippets.filter((snippet) => favoriteIds.includes(snippet._id)) ?? [];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>

      <main>
        <DeleteButton
          isDeleteMode={isDeleteMode}
          onToggleDeleteMode={onToggleDeleteMode}
          selectedIds={selectedIds}
          setIsModalOpen={setIsModalOpen}
        />

        {favoriteSnippets.length === 0 ? (
          <p className="p-4 textgray-500">
            There is no favorite snippets. Mark snippets as favorite to view
            them here.
          </p>
        ) : null}

        <SnippetsList
          snippets={favoriteSnippets}
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
