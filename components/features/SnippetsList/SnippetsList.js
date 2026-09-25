import SnippetCard from "../SnippetCard/SnippetCard";

export default function SnippetsList({
  snippets,
  isDeleteMode,
  selectedIds,
  onSelectSnippet,
}) {
  if (!snippets || snippets.length === 0) {
    return (
      <>
        <p className="font-semibold">
          No snippets found. Create snippets to display them in a list.
        </p>
        <p className="text-gray-500">{`You can create snippets with the "+" button.`}</p>
      </>
    );
  }

  return (
    <ul className="grid gap-4">
      {snippets.map((snippet) => {
        const isSelected = selectedIds.includes(snippet._id);
        return (
          <li key={snippet._id} className="flex items-center gap-3">
            {isDeleteMode && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelectSnippet(snippet._id)}
                className="w-5 h-5 accent-red-600 cursor-pointer transition-all duration-200"
              />
            )}
            <div
              className={`w-full transition-all duration-200 ${isDeleteMode ? "translate-x-1" : ""}`}
            >
              <SnippetCard
                title={snippet.title}
                id={snippet._id}
                language={snippet.language?.name}
                date={snippet.createdAt}
                tags={snippet.tags?.label}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
