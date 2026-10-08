import { useEffect, useRef } from "react";

export default function DeleteConfirmationModal({
  onClose,
  onConfirm,
  isDeleting,
  title = "Are you sure?",
  children,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      className="m-auto rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-6 shadow-xl backdrop:bg-black/70"
    >
      <h3 id="delete-modal-title" className="text-lg font-bold mb-2">
        {title}
      </h3>

      <div className="text-sm  text-gray-600 dark:text-gray-300 mb-8">
        {children}{" "}
      </div>

      <div className="flex items-center justify-end gap-4 mb-4">
        <button
          type="button"
          onClick={onClose}
          className="button button-secondary w-40"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="button button-delete w-50"
        >
          {isDeleting ? "Deleting..." : "Yes, delete"}
        </button>
      </div>
    </dialog>
  );
}
