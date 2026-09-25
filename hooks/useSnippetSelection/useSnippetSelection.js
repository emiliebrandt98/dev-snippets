import { toast } from "react-toastify";
import { useState } from "react";
import { mutate } from "swr";

export default function useSnippetSelection(snippets = []) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  return {
    isDeleteMode,
    onToggleDeleteMode: handleToggleDeleteMode,
    selectedIds,
    setIsModalOpen,
    isDeleteMode,
    onSelectSnippet: handleSelectSnippet,
    onDeleteConfirmed: handleDeleteConfirmed,
    isModalOpen,
    isDeleting,
    selectedSnippets,
  };
}
