import SnippetCard from "../SnippetCard/SnippetCard";

export default function SnippetsList({
  snippets,
  isDeleteMode = false,
  selectedIds = [],
  onSelectSnippet,
}) {
  return (
    <ul className="grid gap-4">
      {snippets.map((snippet) => {
        const isSelected = selectedIds.includes(snippet._id);
        const userName = snippet.userId?.firstName
          ? `${snippet.userId.firstName} ${snippet.userId.lastName}`
          : null;

        return (
          <li key={snippet._id} className="flex items-center gap-3">
            {isDeleteMode && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelectSnippet(snippet._id)}
                className="w-5 h-5 appearance-none rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 checked:bg-red-600 checked:border-red-600 focus:outline-none cursor-pointer transition-all relative flex items-center justify-center checked:after:content-['✓'] checked:after:text-white checked:after:text-sm"
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
                tags={snippet.tags}
                matchedFields={snippet.matchedFields}
                isPublic={snippet.isPublic}
                userName={userName}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
