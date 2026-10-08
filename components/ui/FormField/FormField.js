export default function FormField({
  label,
  htmlFor,
  error,
  errorId,
  children,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-gray-500 dark:text-gray-400"
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-500 flex items-center gap-2 mt-0.5"
        >
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
