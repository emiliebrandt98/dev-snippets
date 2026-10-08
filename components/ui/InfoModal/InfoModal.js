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
      className="m-auto rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-6 shadow-xl backdrop:bg-black/70"
    >
      <h3 id="confirm-modal-title" className="text-lg font-bold mb-2">
        {title}
      </h3>

      <div className="text-sm  text-gray-600 dark:text-gray-300 mb-8">
        {children}
      </div>

      <div className="flex flex-row items-center justify-end gap-4 mb-4">
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
          disabled={isConfirming}
          className="button button-primary w-50"
        >
          {isConfirming ? "Loading..." : "Publishing"}
        </button>
      </div>
    </dialog>
  );
}
