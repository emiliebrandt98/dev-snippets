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
