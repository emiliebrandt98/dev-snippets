import { useState } from "react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  selectedSnippets,
  isDeleting,
}) {
  const [showAllTitles, setShowAllTitles] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
        <p className="text-sm text-gray-600 mb-4">
          You are about to delete the following snippet(s):
        </p>
        <ul className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 mb-4 text-sm bg-gray-50">
          {(showAllTitles
            ? selectedSnippets
            : selectedSnippets.slice(0, 10)
          ).map((snippet) => (
            <li
              key={snippet._id}
              className="py-1 font-medium text-gray-800 truncate"
            >
              • {snippet.title}
            </li>
          ))}
        </ul>

        {selectedSnippets.length > 10 && !showAllTitles && (
          <button
            type="button"
            onClick={() => setShowAllTitles(true)}
            className="text-xs text-blue-600 hover:underline mb-4 block"
          >
            Show more ({selectedSnippets.length - 10} more)
          </button>
        )}

        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
