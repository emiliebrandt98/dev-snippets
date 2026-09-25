import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import { Trash, X } from "lucide-react";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";
import useSnippetSelection from "@/hooks/useSnippetSelection/useSnippetSelection";
import DeleteButton from "@/components/ui/DeleteButton/DeleteButton";

export default function Home({ snippets, isLoading, error }) {
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

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

        <SnippetsList
          snippets={snippets}
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
