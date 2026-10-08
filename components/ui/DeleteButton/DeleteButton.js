import { X, Trash } from "lucide-react";

export default function DeleteButton({
  isDeleteMode,
  onToggleDeleteMode,
  selectedIds,
  setIsModalOpen,
}) {
  return (
    <div className="flex items-center justify-end gap-2 relative">
      {isDeleteMode && (
        <button
          type="button"
          onClick={onToggleDeleteMode}
          aria-label="Cancel delete mode"
          className="button-icon button-icon-primary"
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
        className={`button-icon w-10 h-10 ${
          selectedIds.length > 0
            ? "bg-red-500  border-red-500 text-gray-50 hover:bg-red-500 hover:text-gray-50 focus:outline-offset-4 focus:outline-red-500 active:bg-red-700 active:text-gray-50 dark:text-gray-50 hover:shadow-red-500/40 gap-2"
            : "button-icon button-icon-primary"
        }`}
      >
        <Trash size={16} />
      </button>

      {selectedIds.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-gray-50 border border-gray-400 text-color-900 inline-flex items-center justify-center cursor-pointer w-5 h-5 aspect-square rounded-full transition-colors text-sm text-gray-700">
          {selectedIds.length > 0 ? selectedIds.length : null}
        </span>
      )}
    </div>
  );
}
