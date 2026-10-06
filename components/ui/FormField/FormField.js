export default function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-500">
        {label}
      </label>

      {children}

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-2 mt-0.5">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
