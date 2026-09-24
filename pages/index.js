import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import { Plus, Trash, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";

export default function Home({ snippets, isLoading, error }) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  function handleToggleDeleteMode() {
    if (isDeleteMode) {
      setIsDeleteMode(false);
      setSelectedIds([]);
    } else {
      setIsDeleteMode(true);
    }
  }

  function handleSelectSnippet(snippetId) {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(snippetId)
        ? prevSelectedIds.filter((selectedId) => selectedId !== snippetId)
        : [...prevSelectedIds, snippetId]
    );
  }

  async function handleDeleteConfirmed() {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const response = await fetch("/api/snippets", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetIds: selectedIds }),
      });

      if (!response.ok) {
        toast.error("Failed to delete snippet(s)");
        return;
      }

      await mutate("/api/snippets");
      toast.success("Snippet(s) successfully deleted!");

      setIsDeleteMode(false);
      setSelectedIds([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting snippet(s).");
    } finally {
      setIsDeleting(false);
    }
  }

  const selectedSnippets = snippets.filter((snippet) =>
    selectedIds.includes(snippet._id)
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>

      <main>
        <div className="flex items-center justify-end gap-2 mb-4">
          {isDeleteMode && (
            <button
              type="button"
              onClick={handleToggleDeleteMode}
              aria-label="Cancel delete mode"
              className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={
              selectedIds.length > 0
                ? () => setIsModalOpen(true)
                : handleToggleDeleteMode
            }
            aria-label={
              selectedIds.length > 0 ? "Confirm delete" : "Toggle delete mode"
            }
            className={`inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg transition-colors ${
              selectedIds.length > 0
                ? "bg-red-600 w-14 hover:bg-red-700 text-white gap-2"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Trash size={16} />
            <span>{selectedIds.length > 0 ? selectedIds.length : null}</span>
          </button>
        </div>

        <SnippetsList
          snippets={snippets}
          isDeleteMode={isDeleteMode}
          selectedIds={selectedIds}
          onSelectSnippet={handleSelectSnippet}
        />

        <Link
          href={"/snippet/create-snippet"}
          aria-label="create snippet"
          className="fixed bottom-24 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gray-400 hover:bg-gray-500 shadow-lg"
        >
          <Plus size={24} />
        </Link>
      </main>

      {isModalOpen && (
        <DeleteConfirmationModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirmed}
          selectedSnippets={selectedSnippets}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
