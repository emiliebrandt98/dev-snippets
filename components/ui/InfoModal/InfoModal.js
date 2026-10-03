import { useEffect, useRef } from "react";

export default function InfoModal({
  onClose,
  onConfirm,
  isConfirming,
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
      aria-labelledby="confirm-modal-title"
      className="m-auto w-full max-w-md rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
    >
      <h3 id="delete-modal-title" className="text-lg font-bold mb-2">
        {title}
      </h3>

      <div className="text-sm text-gray-600 mb-4">{children}</div>

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
          {isConfirming ? "Loading..." : "Yes, publishing"}
        </button>
      </div>
    </dialog>
  );
}
