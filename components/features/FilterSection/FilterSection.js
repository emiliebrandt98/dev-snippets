function getChipClass(isActive) {
  const baseClass = "rounded-full px-3 py-1 text-sm";

  if (isActive) {
    return `${baseClass} bg-purple-100`;
  }
  return `${baseClass} bg-gray-100`;
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
        <>
          <ul className="flex flex-wrap gap-2">
            <li>
              <button
                type="button"
                onClick={onClear}
                className={getChipClass(selectedIds.length === 0)}
              >
                All
              </button>
            </li>

            {items.map((item) => {
              const isActive = selectedIds.includes(item.id);

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onToggle(item.id)}
                    className={getChipClass(isActive)}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={onClear}
            className="mt-3 text-sm underline"
          >
            clear
          </button>
        </>
      )}
    </section>
  );
}
