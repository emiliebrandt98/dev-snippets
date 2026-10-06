function getChipClass(isActive) {
  const baseClass = "rounded-full px-3 py-1 text-sm";

  if (isActive) {
    return `${baseClass} bg-purple-400/50 border border-purple-400 text-purple-900 hover:bg-purple-500 hover:border-purple-600 hover:text-purple-100 dark:bg-purple-700/50 dark:border-purple-700/50 dark:hover:bg-purple-700 dark:hover:border-purple-700 dark:text-purple-200`;
  }
  return `${baseClass} bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200 hover:border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:text-gray-50`;
}

export default function FilterSection({
  title,
  items,
  selectedIds,
  isLoading,
  error,
  onToggle,
  onClear,
}) {
  return (
    <section className="mb-6">
      <h3 className="mb-3 text-lg font-bold">{title}</h3>

      {isLoading && <p>Loading...</p>}
      {error && <p>Could not load data.</p>}

      {!isLoading && !error && (
        <ul className="flex flex-wrap gap-2 items-center">
          <li>
            <button
              type="button"
              onClick={onClear}
              className={getChipClass(selectedIds?.length === 0)}
            >
              All
            </button>
          </li>

          {items.map((item) => {
            const isActive = selectedIds?.includes(item.id);

            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onToggle(item.id)}
                  className={getChipClass(isActive)}
                >
                  {item?.label}
                </button>
              </li>
            );
          })}

          <button
            type="button"
            onClick={onClear}
            className="ml-2 text-sm underline pr-4 pb-2.5 pt-2 cursor-pointer"
          >
            clear
          </button>
        </ul>
      )}
    </section>
  );
}
