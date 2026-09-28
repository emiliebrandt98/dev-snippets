import useSnippetSelection from "@/hooks/useSnippetSelection/useSnippetSelection";
import { X, Trash } from "lucide-react";

export default function DeleteButton({
  isDeleteMode,
  onToggleDeleteMode,
  selectedIds,
  setIsModalOpen,
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      {isDeleteMode && (
        <button
          type="button"
          onClick={onToggleDeleteMode}
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
            : onToggleDeleteMode
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
  );
}
