export default function DeleteConfirmationModal({
  onClose,
  onConfirm,
  isDeleting,
  title = "Are you sure?",
  children,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h3 className="text-lg font-bold mb-2">{title}</h3>

        <div className="text-sm text-gray-600 mb-4">{children} </div>

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
